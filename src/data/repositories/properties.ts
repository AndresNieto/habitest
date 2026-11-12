import {
  assertReviewable,
  assertSubmittable,
  DomainError,
  type ReviewDecision,
} from "@/domain/rules";
import {
  PropertyInputSchema,
  type Property,
  type PropertyDocument,
  type PropertyImage,
  type PropertyInput,
  type PropertyStatus,
  type PropertyType,
} from "@/domain/schemas";
import { clone, getDb, latency, mutate, newId } from "../db";
import { getUserSync } from "./users";

export type PropertyFilters = {
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  /** Minimum number of bedrooms. */
  bedrooms?: number;
  /** Minimum number of bathrooms. */
  bathrooms?: number;
  type?: PropertyType;
  status?: PropertyStatus;
};

export const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();

export function matchesFilters(p: Property, f: PropertyFilters) {
  if (p.status !== (f.status ?? "approved")) return false;
  if (f.q) {
    const hay = normalize(`${p.city} ${p.neighborhood} ${p.title}`);
    if (
      !normalize(f.q)
        .split(/\s+/)
        .every((w) => hay.includes(w))
    )
      return false;
  }
  if (f.minPrice != null && p.price < f.minPrice) return false;
  if (f.maxPrice != null && p.price > f.maxPrice) return false;
  if (f.bedrooms != null && p.bedrooms < f.bedrooms) return false;
  if (f.bathrooms != null && p.bathrooms < f.bathrooms) return false;
  if (f.type && p.type !== f.type) return false;
  return true;
}

const newestFirst = (a: Property, b: Property) =>
  (b.reviewedAt ?? b.createdAt).localeCompare(a.reviewedAt ?? a.createdAt);

/** Public listing: only `approved` unless a status is given. */
export async function listProperties(f: PropertyFilters = {}) {
  await latency(350);
  return clone(
    getDb()
      .properties.filter((p) => matchesFilters(p, f))
      .sort(newestFirst),
  );
}

export async function getProperty(id: string) {
  await latency(200);
  const p = getDb().properties.find((x) => x.id === id);
  return p ? clone(p) : undefined;
}

export async function listByOwner(ownerId: string) {
  await latency();
  return clone(
    getDb()
      .properties.filter((p) => p.ownerId === ownerId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
  );
}

export async function listPendingReview() {
  await latency();
  return clone(
    getDb()
      .properties.filter((p) => p.status === "pending_review")
      .sort((a, b) => (a.submittedAt ?? "").localeCompare(b.submittedAt ?? "")),
  );
}

export type DraftData = {
  input: PropertyInput;
  images: Omit<PropertyImage, "id">[];
  documents: Omit<PropertyDocument, "id" | "uploadedAt">[];
};

/** Creates a draft owned by the tenant; optionally submits it right away. */
export async function createProperty(
  ownerId: string,
  data: DraftData,
  opts: { submit?: boolean } = {},
) {
  await latency(400);
  const owner = getUserSync(ownerId);
  if (owner?.role !== "tenant")
    throw new DomainError("Solo un Tenant puede publicar inmuebles.");
  const input = PropertyInputSchema.parse(data.input);
  const now = new Date().toISOString();
  const id = newId("p");
  const property: Property = {
    ...input,
    id,
    ownerId,
    status: "draft",
    images: data.images.map((img, i) => ({ ...img, id: `${id}-img-${i + 1}` })),
    documents: data.documents.map((d, i) => ({
      ...d,
      id: `${id}-doc-${i + 1}`,
      uploadedAt: now,
    })),
    createdAt: now,
  };
  if (opts.submit) {
    assertSubmittable(property);
    property.status = "pending_review";
    property.submittedAt = now;
  }
  mutate((db) => db.properties.push(property));
  return clone(property);
}

export async function submitProperty(id: string, ownerId: string) {
  await latency();
  return mutate((db) => {
    const p = db.properties.find((x) => x.id === id);
    if (!p || p.ownerId !== ownerId)
      throw new DomainError("Inmueble no encontrado.");
    assertSubmittable(p);
    p.status = "pending_review";
    p.submittedAt = new Date().toISOString();
    delete p.rejectionReason;
    return clone(p);
  });
}

export async function reviewProperty(
  id: string,
  reviewerId: string,
  decision: ReviewDecision,
) {
  await latency();
  return mutate((db) => {
    const p = db.properties.find((x) => x.id === id);
    const reviewer = db.users.find((u) => u.id === reviewerId);
    if (!p || !reviewer) throw new DomainError("Inmueble no encontrado.");
    assertReviewable(p, reviewer, decision);
    p.status = decision.decision === "approve" ? "approved" : "rejected";
    p.reviewedAt = new Date().toISOString();
    p.reviewedBy = reviewer.id;
    if (decision.decision === "reject")
      p.rejectionReason = decision.reason.trim();
    else delete p.rejectionReason;
    return clone(p);
  });
}

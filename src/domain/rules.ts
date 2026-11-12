import type {
  DocumentKind,
  Property,
  PropertyStatus,
  User,
  Visit,
} from "./schemas";

export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DomainError";
  }
}

export const MIN_IMAGES = 3;
export const REQUIRED_DOCUMENTS: DocumentKind[] = [
  "certificado_tradicion",
  "escritura",
  "predial",
];

const TRANSITIONS: Record<PropertyStatus, PropertyStatus[]> = {
  draft: ["pending_review"],
  pending_review: ["approved", "rejected"],
  approved: [],
  // A rejected property can be fixed and re-submitted.
  rejected: ["pending_review"],
};

export function canTransition(from: PropertyStatus, to: PropertyStatus) {
  return TRANSITIONS[from].includes(to);
}

/** Problems that block submitting a property for review (empty = ready). */
export function submissionIssues(p: Pick<Property, "images" | "documents">) {
  const issues: string[] = [];
  if (p.images.length < MIN_IMAGES)
    issues.push(`Agrega al menos ${MIN_IMAGES} imágenes.`);
  const kinds = new Set(p.documents.map((d) => d.kind));
  const missing = REQUIRED_DOCUMENTS.filter((k) => !kinds.has(k));
  if (missing.length) issues.push("Faltan documentos obligatorios.");
  return issues;
}

export function assertSubmittable(p: Property) {
  if (!canTransition(p.status, "pending_review"))
    throw new DomainError("Este inmueble no se puede enviar a revisión.");
  const issues = submissionIssues(p);
  if (issues.length) throw new DomainError(issues.join(" "));
}

export type ReviewDecision =
  { decision: "approve" } | { decision: "reject"; reason: string };

export function assertReviewable(
  p: Property,
  reviewer: User,
  d: ReviewDecision,
) {
  if (reviewer.role !== "admin")
    throw new DomainError("Solo un Admin puede revisar inmuebles.");
  if (p.status !== "pending_review")
    throw new DomainError("El inmueble no está pendiente de revisión.");
  if (d.decision === "reject" && d.reason.trim().length < 5)
    throw new DomainError("El rechazo requiere un motivo.");
}

export function assertCanScheduleVisit(p: Property, tenant: User) {
  if (tenant.role !== "tenant")
    throw new DomainError("Solo un Tenant puede agendar visitas.");
  if (p.status !== "approved")
    throw new DomainError("Solo se pueden visitar inmuebles aprobados.");
  if (p.ownerId === tenant.id)
    throw new DomainError("No puedes agendar una visita a tu propio inmueble.");
}

/**
 * Picks the broker for a visit: free in that slot, with the fewest visits that
 * day; ties go to seed order. Returns undefined if every broker is busy.
 */
export function assignBroker(
  brokers: User[],
  visits: Visit[],
  date: string,
  slot: Visit["slot"],
): User | undefined {
  const active = visits.filter(
    (v) => v.date === date && v.status !== "cancelled",
  );
  const candidates = brokers
    .map((b, order) => ({
      b,
      order,
      busy: active.some((v) => v.brokerId === b.id && v.slot === slot),
      load: active.filter((v) => v.brokerId === b.id).length,
    }))
    .filter((c) => !c.busy)
    .sort((x, y) => x.load - y.load || x.order - y.order);
  return candidates[0]?.b;
}

export function assertCanCreateNotary(visit: Visit, broker: User) {
  if (broker.role !== "broker" || visit.brokerId !== broker.id)
    throw new DomainError("Solo el broker asignado puede agendar la notaría.");
  if (visit.status !== "completed")
    throw new DomainError("La visita debe estar completada.");
}

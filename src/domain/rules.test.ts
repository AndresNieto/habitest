import { describe, expect, it } from "vitest";
import { USERS, createSeed } from "@/data/seed";
import {
  assertCanCreateNotary,
  assertCanScheduleVisit,
  assertReviewable,
  assertSubmittable,
  assignBroker,
  canTransition,
  submissionIssues,
} from "./rules";
import type { Property, Visit } from "./schemas";

const user = (id: string) => USERS.find((u) => u.id === id)!;
const tenant = user("u-tenant-1");
const admin = user("u-admin-1");
const brokers = USERS.filter((u) => u.role === "broker");
const seed = createSeed();
const byStatus = (s: Property["status"]) =>
  structuredClone(seed.properties.find((p) => p.status === s)!);

describe("property lifecycle", () => {
  it("allows only draft→pending_review→approved|rejected (and re-submit)", () => {
    expect(canTransition("draft", "pending_review")).toBe(true);
    expect(canTransition("draft", "approved")).toBe(false);
    expect(canTransition("pending_review", "approved")).toBe(true);
    expect(canTransition("pending_review", "rejected")).toBe(true);
    expect(canTransition("approved", "rejected")).toBe(false);
    expect(canTransition("rejected", "pending_review")).toBe(true);
  });

  it("requires 3 images and all documents to submit", () => {
    const draft = byStatus("draft");
    expect(submissionIssues(draft)).toHaveLength(2);
    expect(() => assertSubmittable(draft)).toThrow(/imágenes/);
    const ready = {
      ...draft,
      images: byStatus("approved").images,
      documents: byStatus("approved").documents,
    };
    expect(() => assertSubmittable(ready)).not.toThrow();
  });

  it("only an admin reviews, only pending properties, rejection needs a reason", () => {
    const pending = byStatus("pending_review");
    expect(() =>
      assertReviewable(pending, tenant, { decision: "approve" }),
    ).toThrow();
    expect(() =>
      assertReviewable(byStatus("approved"), admin, { decision: "approve" }),
    ).toThrow();
    expect(() =>
      assertReviewable(pending, admin, { decision: "reject", reason: " " }),
    ).toThrow(/motivo/);
    expect(() =>
      assertReviewable(pending, admin, { decision: "approve" }),
    ).not.toThrow();
  });
});

describe("visits", () => {
  it("only tenants, only approved, never the owner", () => {
    const approved = byStatus("approved");
    expect(() => assertCanScheduleVisit(approved, admin)).toThrow();
    expect(() =>
      assertCanScheduleVisit(byStatus("pending_review"), tenant),
    ).toThrow(/aprobados/);
    expect(() =>
      assertCanScheduleVisit({ ...approved, ownerId: tenant.id }, tenant),
    ).toThrow(/propio/);
    expect(() => assertCanScheduleVisit(approved, tenant)).not.toThrow();
  });

  const visit = (
    brokerId: string,
    slot: Visit["slot"],
    date = "2026-12-01",
  ): Visit => ({
    id: `v-${brokerId}-${slot}`,
    propertyId: "p-001",
    tenantId: "u-tenant-1",
    brokerId,
    date,
    slot,
    status: "scheduled",
    createdAt: "2026-11-01T00:00:00.000Z",
  });

  it("assigns the least-loaded free broker, ties by seed order", () => {
    expect(assignBroker(brokers, [], "2026-12-01", "09:00")?.id).toBe(
      "u-broker-1",
    );
    const visits = [visit("u-broker-1", "11:00"), visit("u-broker-2", "14:00")];
    expect(assignBroker(brokers, visits, "2026-12-01", "09:00")?.id).toBe(
      "u-broker-3",
    );
  });

  it("never double-books a broker in the same slot", () => {
    const visits = brokers.map((b) => visit(b.id, "09:00"));
    expect(
      assignBroker(brokers, visits, "2026-12-01", "09:00"),
    ).toBeUndefined();
    expect(assignBroker(brokers, visits, "2026-12-02", "09:00")?.id).toBe(
      "u-broker-1",
    );
  });

  it("notary needs the assigned broker and a completed visit", () => {
    const v = visit("u-broker-1", "09:00");
    expect(() => assertCanCreateNotary(v, user("u-broker-1"))).toThrow(
      /completada/,
    );
    expect(() =>
      assertCanCreateNotary({ ...v, status: "completed" }, user("u-broker-2")),
    ).toThrow();
    expect(() =>
      assertCanCreateNotary({ ...v, status: "completed" }, user("u-broker-1")),
    ).not.toThrow();
  });
});

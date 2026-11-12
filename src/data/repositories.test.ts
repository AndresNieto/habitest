import { beforeEach, describe, expect, it } from "vitest";
import { PropertySchema } from "@/domain/schemas";
import { createSeed } from "./seed";
import {
  createProperty,
  getProperty,
  listByOwner,
  listPendingReview,
  listProperties,
  resetDb,
  reviewProperty,
  scheduleVisit,
} from "./index";

beforeEach(() => {
  localStorage.clear();
  resetDb();
});

describe("seed", () => {
  it("has ≥20 valid properties in every status and the required users", () => {
    const db = createSeed();
    expect(db.properties.length).toBeGreaterThanOrEqual(20);
    db.properties.forEach((p) => PropertySchema.parse(p));
    expect(new Set(db.properties.map((p) => p.status))).toEqual(
      new Set(["draft", "pending_review", "approved", "rejected"]),
    );
    const count = (r: string) => db.users.filter((u) => u.role === r).length;
    expect([count("tenant"), count("admin"), count("broker")]).toEqual([
      3, 1, 3,
    ]);
  });
});

describe("property repository", () => {
  it("lists only approved properties by default", async () => {
    const list = await listProperties();
    expect(list.length).toBeGreaterThan(0);
    expect(list.every((p) => p.status === "approved")).toBe(true);
  });

  it("filters by accent-insensitive text, price, rooms and type", async () => {
    const bogota = await listProperties({ q: "bogota" });
    expect(bogota.length).toBeGreaterThan(0);
    expect(bogota.every((p) => p.city === "Bogotá")).toBe(true);
    const cheap = await listProperties({ maxPrice: 500_000_000, bedrooms: 2 });
    expect(cheap.every((p) => p.price <= 500_000_000 && p.bedrooms >= 2)).toBe(
      true,
    );
    const country = await listProperties({ type: "country_house" });
    expect(country.every((p) => p.type === "country_house")).toBe(true);
  });

  it("creates, persists and reviews a property through its lifecycle", async () => {
    const approved = (await listProperties())[0]!;
    const created = await createProperty(
      "u-tenant-1",
      {
        input: {
          title: "Casa de prueba en Chía",
          description: "Una casa de prueba con suficiente descripción.",
          type: "house",
          price: 600_000_000,
          city: "Chía",
          neighborhood: "Centro",
          address: "Calle 1 # 2-3",
          bedrooms: 3,
          bathrooms: 2,
          areaM2: 150,
          parking: 1,
          stratum: 4,
        },
        images: approved.images.map(({ url, alt }) => ({ url, alt })),
        documents: approved.documents.map(({ kind, fileName, sizeKb }) => ({
          kind,
          fileName,
          sizeKb,
        })),
      },
      { submit: true },
    );
    expect(created.status).toBe("pending_review");
    expect(
      JSON.parse(localStorage.getItem("habi.db")!).properties,
    ).toContainEqual(expect.objectContaining({ id: created.id }));
    expect((await listPendingReview()).map((p) => p.id)).toContain(created.id);
    expect((await listByOwner("u-tenant-1")).map((p) => p.id)).toContain(
      created.id,
    );

    await expect(
      reviewProperty(created.id, "u-tenant-2", { decision: "approve" }),
    ).rejects.toThrow(/Admin/);
    await reviewProperty(created.id, "u-admin-1", {
      decision: "reject",
      reason: "Falta el predial",
    });
    expect((await getProperty(created.id))?.rejectionReason).toBe(
      "Falta el predial",
    );
  });

  it("reset restores the seed", async () => {
    const pending = (await listPendingReview())[0]!;
    await reviewProperty(pending.id, "u-admin-1", { decision: "approve" });
    resetDb();
    expect((await getProperty(pending.id))?.status).toBe("pending_review");
  });
});

describe("visit repository", () => {
  it("schedules a visit with an auto-assigned broker and blocks duplicates", async () => {
    const p = (await listProperties()).find((x) => x.ownerId !== "u-tenant-1")!;
    const v = await scheduleVisit({
      propertyId: p.id,
      tenantId: "u-tenant-1",
      date: "2026-12-03",
      slot: "11:00",
    });
    expect(v.brokerId).toMatch(/^u-broker-/);
    await expect(
      scheduleVisit({
        propertyId: p.id,
        tenantId: "u-tenant-1",
        date: "2026-12-04",
        slot: "09:00",
      }),
    ).rejects.toThrow(/Ya tienes/);
  });
});

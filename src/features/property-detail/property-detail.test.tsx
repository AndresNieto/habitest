import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { resetDb } from "@/data";
import { createSeed } from "@/data/seed";
import { DEMO_USERS, setSession } from "@/features/session/session-store";
import { visitCta } from "./visit-cta";

const notFound = vi.fn(() => {
  throw new Error("NEXT_NOT_FOUND");
});
vi.mock("next/navigation", () => ({ notFound: () => notFound() }));

const { PropertyDetail, canView } = await import("./property-detail");

const seed = createSeed();
const find = (status: string) =>
  seed.properties.find((p) => p.status === status)!;
const tenant = DEMO_USERS.tenant; // u-tenant-1

beforeEach(() => {
  localStorage.clear();
  resetDb();
  setSession(null);
  notFound.mockClear();
});

describe("visibility", () => {
  it("approved is public; others only for owner or admin", () => {
    const pending = find("pending_review");
    expect(canView(find("approved"), null)).toBe(true);
    expect(canView(pending, null)).toBe(false);
    expect(canView(pending, { id: "u-broker-1", role: "broker" })).toBe(false);
    expect(canView(pending, { id: pending.ownerId, role: "tenant" })).toBe(
      true,
    );
    expect(canView(pending, { id: "u-admin-1", role: "admin" })).toBe(true);
  });
});

describe("visit CTA", () => {
  const approved = seed.properties.find(
    (p) => p.status === "approved" && p.ownerId !== tenant.id,
  )!;

  it("guests are sent to login with a return path", () => {
    expect(visitCta(approved, null)).toEqual({
      kind: "link",
      label: "Ingresa para agendar",
      href: `/login?next=${encodeURIComponent(`/properties/${approved.id}/visit`)}`,
    });
  });

  it("tenants go to the visit flow; owners, admins and brokers cannot", () => {
    expect(visitCta(approved, tenant)).toMatchObject({
      kind: "link",
      href: `/properties/${approved.id}/visit`,
    });
    expect(visitCta({ ...approved, ownerId: tenant.id }, tenant).kind).toBe(
      "note",
    );
    expect(visitCta(approved, DEMO_USERS.admin).kind).toBe("note");
    expect(visitCta(find("pending_review"), tenant).kind).toBe("hidden");
  });
});

describe("PropertyDetail", () => {
  it("renders price, features, amenities and the map", async () => {
    const p = find("approved");
    render(<PropertyDetail id={p.id} />);
    expect(await screen.findAllByText(p.title)).not.toHaveLength(0);
    expect(screen.getAllByText(/\$\s?1\.850\.000\.000/).length).toBeGreaterThan(
      0,
    );
    expect(screen.getByText(`${p.areaM2} m²`)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Lo que ofrece" }),
    ).toBeInTheDocument();
    expect(screen.getByTitle(/Mapa de/)).toBeInTheDocument();
  });

  it("returns 404 for a pending property viewed by a guest", async () => {
    const p = find("pending_review");
    expect(() => render(<PropertyDetail id={p.id} />)).not.toThrow();
    await vi.waitFor(() => expect(notFound).toHaveBeenCalled());
  });
});

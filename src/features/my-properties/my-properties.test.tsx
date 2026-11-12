import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { resetDb } from "@/data";
import { DEMO_USERS, setSession } from "@/features/session/session-store";

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
}));
const { MyProperties } = await import("./my-properties");

beforeEach(() => {
  localStorage.clear();
  resetDb();
  setSession(DEMO_USERS.tenant);
});

describe("MyProperties", () => {
  it("lists only the user's properties with status and rejection reason", async () => {
    render(<MyProperties />);
    expect(
      await screen.findByText("Apartamento en Teusaquillo"),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.getByText("En revisión")).toBeInTheDocument();
    expect(screen.getByText("Rechazado")).toBeInTheDocument();
    expect(screen.getByText(/Motivo del rechazo/)).toBeInTheDocument();
    expect(
      screen.queryByText("Casa moderna con jardín en Chicó"),
    ).not.toBeInTheDocument();
  });
});

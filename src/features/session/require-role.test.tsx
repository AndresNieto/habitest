import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DEMO_USERS, setSession } from "./session-store";

vi.mock("next/navigation", () => ({ usePathname: () => "/admin/reviews" }));
const { guard, RequireRole } = await import("./require-role");
const { safeNext } = await import("@/app/login/role-picker");

beforeEach(() => {
  localStorage.clear();
  setSession(null);
});

describe("route guard", () => {
  it("decides by hydration, session and role", () => {
    expect(guard(false, DEMO_USERS.admin, "admin")).toBe("loading");
    expect(guard(true, null, "admin")).toBe("signed-out");
    expect(guard(true, DEMO_USERS.tenant, "admin")).toBe("forbidden");
    expect(guard(true, DEMO_USERS.admin, "admin")).toBe("ok");
  });

  it("asks guests to sign in with a return path", () => {
    render(<RequireRole role="admin">secreto</RequireRole>);
    expect(screen.queryByText("secreto")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ingresar" })).toHaveAttribute(
      "href",
      "/login?next=%2Fadmin%2Freviews",
    );
  });

  it("blocks other roles and lets the right role through", () => {
    setSession(DEMO_USERS.broker);
    const { unmount } = render(<RequireRole role="admin">secreto</RequireRole>);
    expect(
      screen.getByText("No tienes acceso a esta sección"),
    ).toBeInTheDocument();
    unmount();
    setSession(DEMO_USERS.admin);
    render(<RequireRole role="admin">secreto</RequireRole>);
    expect(screen.getByText("secreto")).toBeInTheDocument();
  });

  it("session persists in localStorage and can be cleared", () => {
    setSession(DEMO_USERS.tenant);
    expect(JSON.parse(localStorage.getItem("habi.session")!).id).toBe(
      "u-tenant-1",
    );
    setSession(null);
    expect(localStorage.getItem("habi.session")).toBeNull();
  });

  it("only follows relative next paths", () => {
    expect(safeNext("/publish")).toBe("/publish");
    expect(safeNext("//evil.com")).toBeNull();
    expect(safeNext("https://evil.com")).toBeNull();
    expect(safeNext(null)).toBeNull();
  });
});

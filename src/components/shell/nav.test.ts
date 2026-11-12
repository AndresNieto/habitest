import { describe, expect, it } from "vitest";
import { isActive, NAV } from "./nav";

describe("role navigation", () => {
  it("gives each role its own sections", () => {
    const hrefs = (r: keyof typeof NAV) => NAV[r].map((i) => i.href);
    expect(hrefs("guest")).toEqual(["/", "/login"]);
    expect(hrefs("tenant")).toContain("/publish");
    expect(hrefs("admin")).toContain("/admin/reviews");
    expect(hrefs("admin")).not.toContain("/publish");
    expect(hrefs("broker")).toContain("/broker");
    expect(hrefs("broker")).not.toContain("/admin/reviews");
  });

  it("matches the home route exactly and sections by prefix", () => {
    expect(isActive("/", "/")).toBe(true);
    expect(isActive("/admin/reviews", "/")).toBe(false);
    expect(isActive("/admin/reviews/42", "/admin/reviews")).toBe(true);
  });
});

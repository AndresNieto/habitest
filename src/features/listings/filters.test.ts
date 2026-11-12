import { describe, expect, it } from "vitest";
import { countAdvancedFilters, filtersToQuery, parseFilters } from "./filters";

describe("listing filters ⇄ URL", () => {
  it("parses valid params and drops invalid ones", () => {
    const f = parseFilters(
      new URLSearchParams(
        "q=Medellín&type=house&minPrice=100&bedrooms=x&bathrooms=-1&maxPrice=900",
      ),
    );
    expect(f).toEqual({
      q: "Medellín",
      type: "house",
      minPrice: 100,
      maxPrice: 900,
    });
    expect(parseFilters(new URLSearchParams("type=castle"))).toEqual({});
  });

  it("round-trips through the query string", () => {
    const f = {
      q: "Cali",
      type: "apartment" as const,
      bedrooms: 2,
      maxPrice: 500_000_000,
    };
    expect(parseFilters(new URLSearchParams(filtersToQuery(f)))).toEqual(f);
    expect(countAdvancedFilters(f)).toBe(2);
  });
});

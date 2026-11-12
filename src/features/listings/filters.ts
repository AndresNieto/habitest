import type { PropertyFilters } from "@/data";
import { PropertyTypeSchema } from "@/domain/schemas";

const NUMERIC = ["minPrice", "maxPrice", "bedrooms", "bathrooms"] as const;

/** Reads listing filters from the URL, ignoring invalid values. */
export function parseFilters(params: URLSearchParams): PropertyFilters {
  const f: PropertyFilters = {};
  const q = params.get("q")?.trim();
  if (q) f.q = q;
  const type = PropertyTypeSchema.safeParse(params.get("type"));
  if (type.success) f.type = type.data;
  for (const key of NUMERIC) {
    const raw = params.get(key);
    const n = raw ? Number(raw) : NaN;
    if (Number.isFinite(n) && n >= 0) f[key] = n;
  }
  return f;
}

/** Writes filters back to a query string (empty values are dropped). */
export function filtersToQuery(f: PropertyFilters): string {
  const p = new URLSearchParams();
  if (f.q) p.set("q", f.q);
  if (f.type) p.set("type", f.type);
  for (const key of NUMERIC) if (f[key] != null) p.set(key, String(f[key]));
  return p.toString();
}

export function countAdvancedFilters(f: PropertyFilters) {
  return NUMERIC.filter((k) => f[k] != null).length;
}

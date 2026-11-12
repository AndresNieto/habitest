"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SearchX, SlidersHorizontal } from "lucide-react";
import { listProperties, subscribeDb } from "@/data";
import type { Property } from "@/domain/schemas";
import { Button, EmptyState } from "@/components/ui";
import { cn } from "@/lib/cn";
import { countAdvancedFilters, filtersToQuery, parseFilters } from "./filters";
import { FiltersModal } from "./filters-modal";
import { PropertyCard, PropertyCardSkeleton } from "./property-card";
import { TypeBar } from "./type-bar";

export function ListingsView() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const query = params.toString();
  const filters = useMemo(
    () => parseFilters(new URLSearchParams(query)),
    [query],
  );

  const [result, setResult] = useState<{
    query: string;
    items: Property[];
  } | null>(null);
  const [version, setVersion] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeDb(() => setVersion((v) => v + 1));
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    let alive = true;
    listProperties(filters).then((items) => {
      if (alive) setResult({ query, items });
    });
    return () => {
      alive = false;
    };
  }, [filters, query, version]);

  const loading = result?.query !== query;
  const items = result?.items ?? [];
  const advanced = countAdvancedFilters(filters);

  const update = (next: typeof filters) => {
    const qs = filtersToQuery(next);
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
      <div className="bg-surface sticky top-20 z-30 -mx-4 flex items-end gap-4 px-4 pt-4 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10">
        <div className="min-w-0 flex-1">
          <TypeBar
            value={filters.type}
            onChange={(type) => update({ ...filters, type })}
          />
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setFiltersOpen(true)}
          className={cn("mb-3 shrink-0 rounded-md", advanced > 0 && "border-2")}
        >
          <SlidersHorizontal className="size-4" aria-hidden />
          Filtros
          {advanced ? (
            <span className="bg-ink flex size-5 items-center justify-center rounded-full text-[11px] text-white">
              {advanced}
            </span>
          ) : null}
        </Button>
      </div>

      <div className="flex items-baseline justify-between pt-6 pb-4">
        <h1 className="text-lg font-semibold">
          {filters.q ? `Inmuebles en “${filters.q}”` : "Inmuebles en venta"}
        </h1>
        <p aria-live="polite" className="text-ink-muted text-sm">
          {loading
            ? "Buscando…"
            : `${items.length} ${items.length === 1 ? "resultado" : "resultados"}`}
        </p>
      </div>

      {loading ? (
        <div
          aria-busy="true"
          className="grid grid-cols-1 gap-x-6 gap-y-10 pb-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {Array.from({ length: 8 }, (_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          icon={<SearchX />}
          title="No encontramos inmuebles"
          description="Prueba con otra ciudad o ajusta los filtros."
          action={
            <Button variant="secondary" onClick={() => update({})}>
              Limpiar filtros
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 pb-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p, i) => (
            <PropertyCard key={p.id} property={p} priority={i < 4} />
          ))}
        </div>
      )}

      {filtersOpen ? (
        <FiltersModal
          open
          initial={filters}
          onClose={() => setFiltersOpen(false)}
          onApply={(adv) => {
            setFiltersOpen(false);
            update({ q: filters.q, type: filters.type, ...adv });
          }}
        />
      ) : null}
    </div>
  );
}

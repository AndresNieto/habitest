"use client";

import { useState } from "react";
import type { PropertyFilters } from "@/data";
import { Button, Input, Modal } from "@/components/ui";
import { cn } from "@/lib/cn";

type Advanced = Pick<
  PropertyFilters,
  "minPrice" | "maxPrice" | "bedrooms" | "bathrooms"
>;

function Counter({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: number;
  onChange: (v?: number) => void;
}) {
  const options = [undefined, 1, 2, 3, 4, 5];
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-3 font-medium">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o ?? "any"}
            type="button"
            aria-pressed={value === o}
            onClick={() => onChange(o)}
            className={cn(
              "h-10 min-w-14 rounded-full border px-4 text-sm font-medium transition-colors",
              value === o
                ? "border-ink bg-ink text-white"
                : "border-line hover:border-ink",
            )}
          >
            {o == null ? "Cualquiera" : `${o}+`}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

const toNumber = (v: string) => {
  const digits = v.replace(/\D/g, "");
  return digits ? Number(digits) : undefined;
};

export function FiltersModal({
  open,
  initial,
  onClose,
  onApply,
}: {
  open: boolean;
  initial: Advanced;
  onClose: () => void;
  onApply: (f: Advanced) => void;
}) {
  const [draft, setDraft] = useState<Advanced>(initial);
  const set = (patch: Advanced) => setDraft((d) => ({ ...d, ...patch }));

  return (
    <Modal
      open={open}
      onClose={onClose}
      variant="sheet"
      title="Filtros"
      footer={
        <div className="flex w-full items-center justify-between">
          <Button
            variant="ghost"
            className="underline"
            onClick={() => setDraft({})}
          >
            Quitar todo
          </Button>
          <Button onClick={() => onApply(draft)}>Mostrar inmuebles</Button>
        </div>
      }
    >
      <div className="flex flex-col gap-8">
        <fieldset>
          <legend className="mb-3 font-medium">Rango de precio (COP)</legend>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Mínimo"
              inputMode="numeric"
              placeholder="$0"
              value={draft.minPrice?.toLocaleString("es-CO") ?? ""}
              onChange={(e) => set({ minPrice: toNumber(e.target.value) })}
            />
            <Input
              label="Máximo"
              inputMode="numeric"
              placeholder="Sin límite"
              value={draft.maxPrice?.toLocaleString("es-CO") ?? ""}
              onChange={(e) => set({ maxPrice: toNumber(e.target.value) })}
            />
          </div>
        </fieldset>
        <Counter
          label="Habitaciones"
          value={draft.bedrooms}
          onChange={(v) => set({ bedrooms: v })}
        />
        <Counter
          label="Baños"
          value={draft.bathrooms}
          onChange={(v) => set({ bathrooms: v })}
        />
      </div>
    </Modal>
  );
}

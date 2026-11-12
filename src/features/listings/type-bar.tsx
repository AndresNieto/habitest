import {
  Building2,
  Castle,
  House,
  LayoutGrid,
  Trees,
  type LucideIcon,
} from "lucide-react";
import type { PropertyType } from "@/domain/schemas";
import { cn } from "@/lib/cn";

const TYPES: { value?: PropertyType; label: string; icon: LucideIcon }[] = [
  { label: "Todos", icon: LayoutGrid },
  { value: "house", label: "Casas", icon: House },
  { value: "apartment", label: "Apartamentos", icon: Building2 },
  { value: "penthouse", label: "Penthouses", icon: Castle },
  { value: "country_house", label: "Campestres", icon: Trees },
];

export function TypeBar({
  value,
  onChange,
}: {
  value?: PropertyType;
  onChange: (t?: PropertyType) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Tipo de inmueble"
      className="flex [scrollbar-width:none] gap-6 overflow-x-auto sm:gap-10"
    >
      {TYPES.map(({ value: v, label, icon: Icon }) => {
        const active = v === value;
        return (
          <button
            key={label}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(v)}
            className={cn(
              "flex shrink-0 flex-col items-center gap-1.5 border-b-2 pt-1 pb-2.5 text-xs font-semibold transition-colors",
              active
                ? "border-ink text-ink"
                : "text-ink-subtle hover:border-line hover:text-ink border-transparent",
            )}
          >
            <Icon
              className="size-6"
              strokeWidth={active ? 2.2 : 1.8}
              aria-hidden
            />
            {label}
          </button>
        );
      })}
    </div>
  );
}

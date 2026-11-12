"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/cn";

/** Airbnb-style search pill; submits `?q=` to the home listing. */
export function SearchPill({ className }: { className?: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const q = params.get("q") ?? "";

  return (
    <form
      role="search"
      key={q}
      onSubmit={(e) => {
        e.preventDefault();
        const value = new FormData(e.currentTarget).get("q")?.toString().trim();
        const next = new URLSearchParams(params.toString());
        if (value) next.set("q", value);
        else next.delete("q");
        const qs = next.toString();
        router.push(qs ? `/?${qs}` : "/");
      }}
      className={cn(
        "border-line bg-surface shadow-pill focus-within:shadow-card hover:shadow-card flex h-12 items-center gap-2 rounded-full border pr-2 pl-5 transition-shadow",
        className,
      )}
    >
      <label htmlFor="global-search" className="sr-only">
        Buscar por ciudad o barrio
      </label>
      <input
        id="global-search"
        name="q"
        type="search"
        defaultValue={q}
        placeholder="¿Dónde quieres vivir? Ciudad o barrio"
        className="text-ink placeholder:text-ink-subtle min-w-0 flex-1 bg-transparent text-sm font-medium focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Buscar"
        className="bg-brand hover:bg-brand-hover flex size-8 shrink-0 items-center justify-center rounded-full text-white"
      >
        <Search className="size-4" strokeWidth={3} aria-hidden />
      </button>
    </form>
  );
}

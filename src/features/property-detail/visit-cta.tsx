"use client";

import Link from "next/link";
import type { Property } from "@/domain/schemas";
import type { SessionUser } from "@/features/session/session-store";
import { buttonClasses } from "@/components/ui";

/** Decides what the "Agendar visita" call to action does for the viewer. */
export function visitCta(p: Property, user: SessionUser | null) {
  const visitHref = `/properties/${p.id}/visit`;
  if (p.status !== "approved") return { kind: "hidden" as const };
  if (!user)
    return {
      kind: "link" as const,
      href: `/login?next=${encodeURIComponent(visitHref)}`,
      label: "Ingresa para agendar",
    };
  if (user.id === p.ownerId)
    return { kind: "note" as const, text: "Este inmueble es tuyo." };
  if (user.role !== "tenant")
    return {
      kind: "note" as const,
      text: "Solo los Tenants pueden agendar visitas.",
    };
  return { kind: "link" as const, href: visitHref, label: "Agendar visita" };
}

export function VisitCta({
  property,
  user,
}: {
  property: Property;
  user: SessionUser | null;
}) {
  const cta = visitCta(property, user);
  if (cta.kind === "hidden") return null;
  if (cta.kind === "note")
    return (
      <p className="bg-surface-muted text-ink-muted rounded-sm px-4 py-3 text-center text-sm">
        {cta.text}
      </p>
    );
  return (
    <Link href={cta.href} className={buttonClasses("primary", "lg", true)}>
      {cta.label}
    </Link>
  );
}

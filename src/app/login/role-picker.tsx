"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Check, ChevronRight } from "lucide-react";
import { Avatar } from "@/components/ui";
import { USERS } from "@/data/seed";
import {
  ROLE_LABEL,
  setSession,
  useSession,
  type Role,
} from "@/features/session/session-store";

const ROLES: Role[] = ["tenant", "admin", "broker"];

const DESCRIPTION: Record<Role, string> = {
  tenant: "Compra o publica tu inmueble para la venta.",
  admin: "Revisa solicitudes y maneja las finanzas.",
  broker: "Muestra inmuebles y agenda citas en notaría.",
};

export const HOME: Record<Role, string> = {
  tenant: "/",
  admin: "/admin/reviews",
  broker: "/broker",
};

/** Only follow same-site relative paths. */
export function safeNext(next: string | null) {
  return next?.startsWith("/") && !next.startsWith("//") ? next : null;
}

export function RolePicker() {
  const router = useRouter();
  const current = useSession();
  const next = safeNext(useSearchParams().get("next"));

  return (
    <div className="mt-8 flex flex-col gap-8">
      {ROLES.map((role) => (
        <section key={role} aria-labelledby={`role-${role}`}>
          <h2 id={`role-${role}`} className="font-semibold">
            {ROLE_LABEL[role]}
          </h2>
          <p className="text-ink-muted mb-3 text-sm">{DESCRIPTION[role]}</p>
          <ul className="flex flex-col gap-2">
            {USERS.filter((u) => u.role === role).map((u) => (
              <li key={u.id}>
                <button
                  type="button"
                  onClick={() => {
                    setSession({ id: u.id, name: u.name, role: u.role });
                    router.push(next ?? HOME[role]);
                  }}
                  className="border-line hover:shadow-card flex w-full items-center gap-4 rounded-lg border p-3 text-left transition-shadow"
                >
                  <Avatar name={u.name} size="sm" />
                  <span className="flex-1">
                    <span className="block font-medium">{u.name}</span>
                    <span className="text-ink-subtle block text-sm">
                      {u.email}
                    </span>
                  </span>
                  {current?.id === u.id ? (
                    <Check
                      className="text-success size-5"
                      aria-label="Sesión actual"
                    />
                  ) : (
                    <ChevronRight
                      className="text-ink-subtle size-5"
                      aria-hidden
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Avatar } from "@/components/ui";
import {
  DEMO_USERS,
  ROLE_LABEL,
  setSession,
  type Role,
} from "@/features/session/session-store";

const DESCRIPTION: Record<Role, string> = {
  tenant: "Compra o publica tu inmueble para la venta.",
  admin: "Revisa solicitudes y maneja las finanzas.",
  broker: "Muestra inmuebles y agenda citas en notaría.",
};

const HOME: Record<Role, string> = {
  tenant: "/",
  admin: "/admin/reviews",
  broker: "/broker",
};

export function RolePicker() {
  const router = useRouter();
  return (
    <ul className="mt-8 flex flex-col gap-3">
      {(Object.keys(DEMO_USERS) as Role[]).map((role) => (
        <li key={role}>
          <button
            type="button"
            onClick={() => {
              setSession(DEMO_USERS[role]);
              router.push(HOME[role]);
            }}
            className="border-line hover:shadow-card flex w-full items-center gap-4 rounded-lg border p-4 text-left transition-shadow"
          >
            <Avatar name={DEMO_USERS[role].name} />
            <span className="flex-1">
              <span className="block font-semibold">{ROLE_LABEL[role]}</span>
              <span className="text-ink-muted block text-sm">
                {DESCRIPTION[role]}
              </span>
            </span>
            <ChevronRight className="text-ink-subtle size-5" aria-hidden />
          </button>
        </li>
      ))}
    </ul>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Lock, LogIn } from "lucide-react";
import { buttonClasses, EmptyState, Skeleton } from "@/components/ui";
import {
  ROLE_LABEL,
  useHydrated,
  useSession,
  type Role,
} from "./session-store";

export type GuardResult = "loading" | "signed-out" | "forbidden" | "ok";

export function guard(
  hydrated: boolean,
  user: { role: Role } | null,
  role: Role,
): GuardResult {
  if (!hydrated) return "loading";
  if (!user) return "signed-out";
  return user.role === role ? "ok" : "forbidden";
}

/** Renders children only for a signed-in user with the given role. */
export function RequireRole({
  role,
  children,
}: {
  role: Role;
  children: ReactNode;
}) {
  const hydrated = useHydrated();
  const user = useSession();
  const pathname = usePathname();
  const state = guard(hydrated, user, role);

  if (state === "loading")
    return (
      <div aria-busy="true" className="mx-auto max-w-4xl px-4 py-10">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="mt-6 h-40 w-full" />
      </div>
    );

  if (state === "signed-out")
    return (
      <EmptyState
        icon={<LogIn />}
        title="Ingresa para continuar"
        description={`Esta sección es para usuarios ${ROLE_LABEL[role]}.`}
        action={
          <Link
            href={`/login?next=${encodeURIComponent(pathname)}`}
            className={buttonClasses("primary")}
          >
            Ingresar
          </Link>
        }
      />
    );

  if (state === "forbidden")
    return (
      <EmptyState
        icon={<Lock />}
        title="No tienes acceso a esta sección"
        description={`Necesitas una sesión de ${ROLE_LABEL[role]}. Cambia de usuario desde el menú.`}
        action={
          <Link href="/login" className={buttonClasses("secondary")}>
            Cambiar de usuario
          </Link>
        }
      />
    );

  return <>{children}</>;
}

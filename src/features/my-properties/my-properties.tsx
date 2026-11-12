"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CircleAlert, CircleCheck, HousePlus, Plus } from "lucide-react";
import { listByOwner, subscribeDb } from "@/data";
import type { Property } from "@/domain/schemas";
import {
  buttonClasses,
  EmptyState,
  Skeleton,
  StatusBadge,
} from "@/components/ui";
import { useSession } from "@/features/session/session-store";
import { formatCOP, formatDate } from "@/lib/format";

const STATUS_HINT: Record<Property["status"], string> = {
  draft: "Borrador sin enviar.",
  pending_review: "Un Admin está revisando tu inmueble.",
  approved: "Publicado y visible para todos.",
  rejected: "No fue aprobado.",
};

export function MyProperties() {
  const user = useSession();
  const created = useSearchParams().get("created");
  const [items, setItems] = useState<Property[] | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const unsubscribe = subscribeDb(() => setVersion((v) => v + 1));
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    let alive = true;
    listByOwner(user.id).then((list) => alive && setItems(list));
    return () => {
      alive = false;
    };
  }, [user, version]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Mis inmuebles</h1>
        <Link href="/publish" className={buttonClasses("primary", "sm")}>
          <Plus className="size-4" aria-hidden />
          Publicar
        </Link>
      </div>

      {created ? (
        <div
          role="status"
          className="border-success/30 bg-success-soft text-success mb-6 flex items-start gap-3 rounded-md border p-4"
        >
          <CircleCheck className="mt-0.5 size-5 shrink-0" aria-hidden />
          <p>
            <span className="font-semibold">¡Enviado a revisión!</span> Te
            avisaremos aquí cuando un Admin lo apruebe o lo rechace.
          </p>
        </div>
      ) : null}

      {items === null ? (
        <div aria-busy="true" className="flex flex-col gap-4">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-28 w-full rounded-lg" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          icon={<HousePlus />}
          title="Aún no has publicado inmuebles"
          description="Publica tu inmueble y lo revisaremos en menos de 48 horas."
          action={
            <Link href="/publish" className={buttonClasses("primary")}>
              Publicar mi inmueble
            </Link>
          }
        />
      ) : (
        <ul className="flex flex-col gap-4">
          {items.map((p) => (
            <li key={p.id}>
              <article
                className={`hover:shadow-card relative flex gap-4 rounded-lg border p-3 transition-shadow ${p.id === created ? "border-ink" : "border-line"}`}
              >
                <div className="bg-surface-muted size-24 shrink-0 overflow-hidden rounded-md sm:size-28">
                  {p.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.images[0].url.replace(/w=\d+/, "w=300")}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={p.status} />
                    <span className="text-ink-subtle text-xs">
                      Creado el {formatDate(p.createdAt)}
                    </span>
                  </div>
                  <h2 className="truncate font-semibold">
                    <Link
                      href={`/properties/${p.id}`}
                      className="after:absolute after:inset-0"
                    >
                      {p.title}
                    </Link>
                  </h2>
                  <p className="text-ink-muted text-sm">
                    {p.neighborhood}, {p.city} · {formatCOP(p.price)}
                  </p>
                  <p className="text-ink-subtle text-sm">
                    {STATUS_HINT[p.status]}
                  </p>
                  {p.status === "rejected" && p.rejectionReason ? (
                    <p className="bg-danger-soft text-danger mt-1 flex items-start gap-2 rounded-sm px-3 py-2 text-sm">
                      <CircleAlert
                        className="mt-0.5 size-4 shrink-0"
                        aria-hidden
                      />
                      <span>
                        <span className="font-semibold">
                          Motivo del rechazo:
                        </span>{" "}
                        {p.rejectionReason}
                      </span>
                    </p>
                  ) : null}
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

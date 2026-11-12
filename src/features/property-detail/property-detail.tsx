"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Bath,
  BedDouble,
  Building,
  Car,
  Check,
  ChevronLeft,
  FileCheck2,
  MapPin,
  Ruler,
  ShieldCheck,
} from "lucide-react";
import { getProperty, getUserSync, subscribeDb } from "@/data";
import { approxLocation, osmEmbedUrl } from "@/domain/geo";
import {
  AMENITY_LABEL,
  DOCUMENT_KIND_LABEL,
  PROPERTY_TYPE_LABEL,
  type Property,
} from "@/domain/schemas";
import { useSession } from "@/features/session/session-store";
import { Avatar, Skeleton, StatusBadge } from "@/components/ui";
import { formatCOP } from "@/lib/format";
import { Gallery } from "./gallery";
import { VisitCta } from "./visit-cta";

/** Non-approved properties are only visible to their owner and to admins. */
export function canView(
  p: Property,
  user: { id: string; role: string } | null,
) {
  return (
    p.status === "approved" || user?.id === p.ownerId || user?.role === "admin"
  );
}

function DetailSkeleton() {
  return (
    <div
      aria-busy="true"
      className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-10"
    >
      <Skeleton className="mb-4 h-8 w-2/3" />
      <Skeleton className="aspect-[4/3] w-full rounded-xl md:aspect-auto md:h-[28rem]" />
      <Skeleton className="mt-8 h-5 w-1/2" />
      <Skeleton className="mt-3 h-5 w-1/3" />
    </div>
  );
}

export function PropertyDetail({ id }: { id: string }) {
  const user = useSession();
  const [state, setState] = useState<{
    id: string;
    property?: Property;
  } | null>(null);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    const unsubscribe = subscribeDb(() => setVersion((v) => v + 1));
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    let alive = true;
    getProperty(id).then((property) => alive && setState({ id, property }));
    return () => {
      alive = false;
    };
  }, [id, version]);

  if (state?.id !== id) return <DetailSkeleton />;
  const p = state.property;
  if (!p || !canView(p, user)) notFound();

  const owner = getUserSync(p.ownerId);
  const { lat, lng } = approxLocation(p.city, p.neighborhood);
  const features = [
    {
      icon: BedDouble,
      label: `${p.bedrooms} ${p.bedrooms === 1 ? "habitación" : "habitaciones"}`,
    },
    {
      icon: Bath,
      label: `${p.bathrooms} ${p.bathrooms === 1 ? "baño" : "baños"}`,
    },
    { icon: Ruler, label: `${p.areaM2} m²` },
    {
      icon: Car,
      label: p.parking
        ? `${p.parking} parqueadero${p.parking > 1 ? "s" : ""}`
        : "Sin parqueadero",
    },
    { icon: Building, label: `Estrato ${p.stratum}` },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-4 pb-32 sm:px-6 md:pt-6 md:pb-16 lg:px-10">
      <Link
        href="/"
        className="text-ink-muted hover:text-ink mb-3 inline-flex items-center gap-1 text-sm font-medium md:hidden"
      >
        <ChevronLeft className="size-4" aria-hidden /> Inmuebles
      </Link>

      {p.status !== "approved" ? (
        <div className="border-line bg-surface-muted mb-4 flex flex-wrap items-center gap-3 rounded-md border px-4 py-3 text-sm">
          <StatusBadge status={p.status} />
          <span className="text-ink-muted">
            {p.status === "rejected" && p.rejectionReason
              ? `Motivo: ${p.rejectionReason}`
              : "Este inmueble no es visible al público todavía."}
          </span>
        </div>
      ) : null}

      <h1 className="mb-4 hidden text-2xl font-semibold md:block">{p.title}</h1>
      <Gallery images={p.images} />

      <div className="mt-6 grid gap-12 md:mt-8 md:grid-cols-[1fr_22rem]">
        <div className="divide-line flex flex-col divide-y">
          <section className="pb-6">
            <h1 className="mb-1 text-xl font-semibold md:hidden">{p.title}</h1>
            <h2 className="text-ink-muted md:text-ink md:text-xl md:font-semibold">
              {PROPERTY_TYPE_LABEL[p.type]} en {p.neighborhood}, {p.city}
            </h2>
            <ul className="text-ink-muted mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {features.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-1.5">
                  <Icon className="size-4" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </section>

          {owner ? (
            <section className="flex items-center gap-4 py-6">
              <Avatar name={owner.name} />
              <div>
                <p className="font-semibold">
                  Publicado por {owner.name.split(" ")[0]}
                </p>
                <p className="text-ink-muted text-sm">Propietario verificado</p>
              </div>
            </section>
          ) : null}

          {p.status === "approved" ? (
            <section className="flex flex-col gap-5 py-6">
              <div className="flex gap-4">
                <ShieldCheck className="size-6 shrink-0" aria-hidden />
                <div>
                  <p className="font-semibold">Validado por Habi</p>
                  <p className="text-ink-muted text-sm">
                    Revisamos los datos, las fotos y los documentos de este
                    inmueble.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <FileCheck2 className="size-6 shrink-0" aria-hidden />
                <div>
                  <p className="font-semibold">Documentos al día</p>
                  <p className="text-ink-muted text-sm">
                    {p.documents
                      .map((d) => DOCUMENT_KIND_LABEL[d.kind])
                      .join(" · ")}
                  </p>
                </div>
              </div>
            </section>
          ) : null}

          <section className="py-6">
            <h2 className="mb-3 text-lg font-semibold">
              Acerca de este inmueble
            </h2>
            <p className="text-ink-muted leading-relaxed whitespace-pre-line">
              {p.description}
            </p>
          </section>

          {p.amenities.length ? (
            <section className="py-6">
              <h2 className="mb-4 text-lg font-semibold">Lo que ofrece</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {p.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-3">
                    <Check className="text-success size-5" aria-hidden />
                    {AMENITY_LABEL[a]}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="py-6">
            <h2 className="mb-1 text-lg font-semibold">Ubicación</h2>
            <p className="text-ink-muted mb-4 flex items-center gap-1.5">
              <MapPin className="size-4" aria-hidden />
              {p.neighborhood}, {p.city} · ubicación aproximada
            </p>
            <div className="border-line bg-surface-muted relative h-72 overflow-hidden rounded-lg border">
              <iframe
                title={`Mapa de ${p.neighborhood}, ${p.city}`}
                src={osmEmbedUrl(lat, lng)}
                loading="lazy"
                className="h-full w-full grayscale-[30%]"
              />
              <span
                aria-hidden
                className="border-brand bg-brand/15 pointer-events-none absolute top-1/2 left-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
              />
            </div>
          </section>
        </div>

        {/* Price card: sticky aside on desktop */}
        <aside className="hidden md:block">
          <div className="border-line shadow-card sticky top-28 flex flex-col gap-4 rounded-lg border p-6">
            <div>
              <p className="text-2xl font-semibold">{formatCOP(p.price)}</p>
              <p className="text-ink-muted text-sm">
                {formatCOP(Math.round(p.price / p.areaM2))} por m²
              </p>
            </div>
            <VisitCta property={p} user={user} />
            <p className="text-ink-subtle text-center text-xs">
              Un broker de Habi te acompañará en la visita.
            </p>
          </div>
        </aside>
      </div>

      {/* Mobile sticky CTA bar */}
      <div className="border-line bg-surface fixed inset-x-0 bottom-0 z-40 flex items-center gap-4 border-t px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] md:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold">{formatCOP(p.price)}</p>
          <p className="text-ink-muted text-xs">
            {p.areaM2} m² · {p.city}
          </p>
        </div>
        <div className="shrink-0">
          <VisitCta property={p} user={user} />
        </div>
      </div>
    </div>
  );
}

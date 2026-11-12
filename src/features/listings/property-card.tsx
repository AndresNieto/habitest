"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  Bath,
  BedDouble,
  ChevronLeft,
  ChevronRight,
  Ruler,
} from "lucide-react";
import { PROPERTY_TYPE_LABEL, type Property } from "@/domain/schemas";
import { formatCOP } from "@/lib/format";
import { cn } from "@/lib/cn";

/** Requests a smaller rendition of remote Unsplash photos for cards. */
export const cardImage = (url: string) =>
  url.startsWith("https://images.unsplash.com")
    ? url.replace(/w=\d+/, "w=720")
    : url;

export function PropertyCard({
  property: p,
  priority = false,
}: {
  property: Property;
  priority?: boolean;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const images = p.images.slice(0, 5);
  const href = `/properties/${p.id}`;

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  return (
    <article className="group relative flex flex-col gap-3">
      <div className="bg-surface-muted relative aspect-[20/19] overflow-hidden rounded-lg">
        <div
          ref={track}
          onScroll={(e) => {
            const el = e.currentTarget;
            setIndex(Math.round(el.scrollLeft / el.clientWidth));
          }}
          className="flex h-full snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto [&::-webkit-scrollbar]:hidden"
        >
          {images.map((img, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={img.id}
              src={cardImage(img.url)}
              alt={i === 0 ? img.alt : ""}
              loading={priority && i === 0 ? "eager" : "lazy"}
              className="h-full w-full shrink-0 snap-center object-cover"
            />
          ))}
        </div>

        <span className="bg-surface/95 text-ink shadow-pill absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs font-semibold">
          {PROPERTY_TYPE_LABEL[p.type]}
        </span>

        {images.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Foto anterior"
              onClick={() => go(-1)}
              className={cn(
                "bg-surface/95 text-ink shadow-pill absolute top-1/2 left-3 z-10 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full transition-opacity hover:scale-105 md:flex",
                "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
                index === 0 && "pointer-events-none !opacity-0",
              )}
            >
              <ChevronLeft className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Foto siguiente"
              onClick={() => go(1)}
              className={cn(
                "bg-surface/95 text-ink shadow-pill absolute top-1/2 right-3 z-10 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full transition-opacity hover:scale-105 md:flex",
                "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
                index === images.length - 1 && "pointer-events-none !opacity-0",
              )}
            >
              <ChevronRight className="size-4" aria-hidden />
            </button>
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5"
            >
              {images.map((img, i) => (
                <span
                  key={img.id}
                  className={cn(
                    "size-1.5 rounded-full bg-white transition-opacity",
                    i === index ? "opacity-100" : "opacity-60",
                  )}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>

      <div className="flex flex-col gap-0.5">
        <h3 className="text-ink font-semibold">
          {/* Stretched link: the whole card navigates, arrows stay clickable. */}
          <Link
            href={href}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {p.neighborhood}, {p.city}
          </Link>
        </h3>
        <p className="text-ink-muted line-clamp-1 text-sm">{p.title}</p>
        <p className="text-ink-muted flex items-center gap-3 text-sm">
          <span className="flex items-center gap-1">
            <BedDouble className="size-4" aria-hidden />
            {p.bedrooms} <span className="sr-only">habitaciones</span>
          </span>
          <span className="flex items-center gap-1">
            <Bath className="size-4" aria-hidden />
            {p.bathrooms} <span className="sr-only">baños</span>
          </span>
          <span className="flex items-center gap-1">
            <Ruler className="size-4" aria-hidden />
            {p.areaM2} m²
          </span>
        </p>
        <p className="text-ink mt-1">
          <span className="font-semibold">{formatCOP(p.price)}</span>
        </p>
      </div>
    </article>
  );
}

export function PropertyCardSkeleton() {
  return (
    <div aria-hidden className="flex flex-col gap-3">
      <div className="bg-surface-muted aspect-[20/19] animate-pulse rounded-lg" />
      <div className="bg-surface-muted h-4 w-2/3 animate-pulse rounded-sm" />
      <div className="bg-surface-muted h-4 w-1/2 animate-pulse rounded-sm" />
      <div className="bg-surface-muted h-4 w-1/3 animate-pulse rounded-sm" />
    </div>
  );
}

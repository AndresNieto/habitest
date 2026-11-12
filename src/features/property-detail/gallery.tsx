"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Grid3x3 } from "lucide-react";
import type { PropertyImage } from "@/domain/schemas";
import { cn } from "@/lib/cn";

const sized = (url: string, w: number) =>
  url.startsWith("https://images.unsplash.com")
    ? url.replace(/w=\d+/, `w=${w}`)
    : url;

function Fullscreen({
  images,
  open,
  onClose,
}: {
  images: PropertyImage[];
  open: boolean;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal?.();
    if (!open && d.open) d.close?.();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label="Todas las fotos"
      onClose={onClose}
      className="bg-surface text-ink m-0 h-dvh max-h-none w-screen max-w-none p-0 backdrop:bg-black"
    >
      {open ? (
        <div className="flex h-full flex-col">
          <div className="border-line bg-surface sticky top-0 z-10 flex items-center border-b px-4 py-3">
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar galería"
              className="hover:bg-surface-muted rounded-full p-2"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <p className="flex-1 text-center text-sm font-semibold">
              {images.length} fotos
            </p>
            <span className="w-9" />
          </div>
          <div className="mx-auto grid w-full max-w-3xl flex-1 gap-2 overflow-y-auto p-4 sm:grid-cols-2">
            {images.map((img, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={img.id}
                src={sized(img.url, 1600)}
                alt={img.alt}
                loading="lazy"
                className={cn(
                  "w-full rounded-sm object-cover",
                  i % 3 === 0 ? "sm:col-span-2" : "aspect-[4/3]",
                )}
              />
            ))}
          </div>
        </div>
      ) : null}
    </dialog>
  );
}

export function Gallery({ images }: { images: PropertyImage[] }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [hero, ...rest] = images;
  if (!hero) return null;

  return (
    <>
      {/* Mobile: swipeable carousel */}
      <div className="relative -mx-4 sm:-mx-6 md:hidden">
        <div
          onScroll={(e) => {
            const el = e.currentTarget;
            setIndex(Math.round(el.scrollLeft / el.clientWidth));
          }}
          className="flex aspect-[4/3] snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto"
        >
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setOpen(true)}
              className="h-full w-full shrink-0 snap-center"
              aria-label={`Ver foto ${i + 1} de ${images.length}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sized(img.url, 900)}
                alt={img.alt}
                loading={i === 0 ? "eager" : "lazy"}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
        <span className="absolute right-3 bottom-3 rounded-sm bg-black/70 px-2.5 py-1 text-xs font-semibold text-white">
          {index + 1} / {images.length}
        </span>
      </div>

      {/* Desktop: Airbnb-style mosaic */}
      <div className="relative hidden h-[28rem] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-xl md:grid">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="col-span-2 row-span-2"
          aria-label="Ver todas las fotos"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={sized(hero.url, 1400)}
            alt={hero.alt}
            className="h-full w-full object-cover transition hover:brightness-90"
          />
        </button>
        {rest.slice(0, 4).map((img) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Ver todas las fotos"
            tabIndex={-1}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sized(img.url, 700)}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover transition hover:brightness-90"
            />
          </button>
        ))}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="border-ink bg-surface shadow-pill hover:bg-surface-muted absolute right-4 bottom-4 flex items-center gap-2 rounded-sm border px-3 py-1.5 text-sm font-semibold"
        >
          <Grid3x3 className="size-4" aria-hidden />
          Mostrar todas las fotos
        </button>
      </div>

      <Fullscreen images={images} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

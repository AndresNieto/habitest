"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Castle,
  FileText,
  House,
  ImagePlus,
  Minus,
  Plus,
  Star,
  Trash2,
  Trees,
  Upload,
  type LucideIcon,
} from "lucide-react";
import { Input, Select } from "@/components/ui";
import { MIN_IMAGES, REQUIRED_DOCUMENTS } from "@/domain/rules";
import {
  AMENITY_LABEL,
  AmenitySchema,
  DOCUMENT_KIND_LABEL,
  PROPERTY_TYPE_LABEL,
  type PropertyType,
} from "@/domain/schemas";
import { cn } from "@/lib/cn";
import { formatCOP } from "@/lib/format";
import { imageToDataUrl } from "./image-utils";
import {
  MAX_IMAGES,
  moveImage,
  toInput,
  type Errors,
  type WizardState,
} from "./wizard-state";

export type StepProps = {
  state: WizardState;
  errors: Errors;
  set: (
    patch:
      Partial<WizardState> | ((current: WizardState) => Partial<WizardState>),
  ) => void;
};

const TYPE_ICONS: Record<PropertyType, LucideIcon> = {
  house: House,
  apartment: Building2,
  penthouse: Castle,
  country_house: Trees,
};

const CITIES = [
  "Bogotá",
  "Medellín",
  "Cali",
  "Barranquilla",
  "Cartagena",
  "Bucaramanga",
  "Pereira",
  "Rionegro",
];

function ErrorText({ children }: { children?: string }) {
  return children ? (
    <p role="alert" className="text-danger text-sm">
      {children}
    </p>
  ) : null;
}

export function LocationStep({ state, errors, set }: StepProps) {
  return (
    <div className="flex flex-col gap-6">
      <fieldset>
        <legend className="mb-3 font-medium">Tipo de inmueble</legend>
        <div className="grid grid-cols-2 gap-3">
          {(Object.keys(PROPERTY_TYPE_LABEL) as PropertyType[]).map((t) => {
            const Icon = TYPE_ICONS[t];
            const active = state.type === t;
            return (
              <button
                key={t}
                type="button"
                aria-pressed={active}
                onClick={() => set({ type: t })}
                className={cn(
                  "flex flex-col items-start gap-3 rounded-md border p-4 text-left font-medium transition",
                  active
                    ? "border-ink bg-surface-muted ring-ink ring-1"
                    : "border-line hover:border-ink",
                )}
              >
                <Icon className="size-7" aria-hidden />
                {PROPERTY_TYPE_LABEL[t]}
              </button>
            );
          })}
        </div>
        <ErrorText>{errors.type}</ErrorText>
      </fieldset>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Ciudad"
          list="publish-cities"
          value={state.city}
          onChange={(e) => set({ city: e.target.value })}
          error={errors.city}
          autoComplete="address-level2"
        />
        <datalist id="publish-cities">
          {CITIES.map((c) => (
            <option key={c} value={c} />
          ))}
        </datalist>
        <Input
          label="Barrio"
          value={state.neighborhood}
          onChange={(e) => set({ neighborhood: e.target.value })}
          error={errors.neighborhood}
        />
      </div>
      <Input
        label="Dirección"
        placeholder="Cra. 7 # 72-41, apto 502"
        hint="Solo mostramos el barrio al público."
        value={state.address}
        onChange={(e) => set({ address: e.target.value })}
        error={errors.address}
        autoComplete="street-address"
      />
    </div>
  );
}

function Counter({
  label,
  value,
  min,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between py-4">
      <span className="font-medium">{label}</span>
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label={`Menos ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
          className="border-line-strong text-ink-muted hover:border-ink flex size-8 items-center justify-center rounded-full border disabled:opacity-30"
        >
          <Minus className="size-4" aria-hidden />
        </button>
        <span aria-live="polite" className="w-6 text-center">
          {value}
        </span>
        <button
          type="button"
          aria-label={`Más ${label.toLowerCase()}`}
          disabled={value >= 20}
          onClick={() => onChange(value + 1)}
          className="border-line-strong text-ink-muted hover:border-ink flex size-8 items-center justify-center rounded-full border disabled:opacity-30"
        >
          <Plus className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}

export function FeaturesStep({ state, errors, set }: StepProps) {
  const toggle = (a: WizardState["amenities"][number]) =>
    set({
      amenities: state.amenities.includes(a)
        ? state.amenities.filter((x) => x !== a)
        : [...state.amenities, a],
    });
  return (
    <div className="flex flex-col gap-6">
      <div className="divide-line divide-y">
        <Counter
          label="Habitaciones"
          value={state.bedrooms}
          min={0}
          onChange={(v) => set({ bedrooms: v })}
        />
        <Counter
          label="Baños"
          value={state.bathrooms}
          min={1}
          onChange={(v) => set({ bathrooms: v })}
        />
        <Counter
          label="Parqueaderos"
          value={state.parking}
          min={0}
          onChange={(v) => set({ parking: v })}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Área construida (m²)"
          inputMode="decimal"
          value={state.areaM2}
          onChange={(e) => set({ areaM2: e.target.value })}
          error={errors.areaM2}
        />
        <Select
          label="Estrato"
          placeholder="Selecciona"
          options={[1, 2, 3, 4, 5, 6].map((n) => ({
            value: String(n),
            label: `Estrato ${n}`,
          }))}
          value={state.stratum}
          onChange={(e) => set({ stratum: e.target.value })}
          error={errors.stratum}
        />
      </div>
      <fieldset>
        <legend className="mb-3 font-medium">Amenidades</legend>
        <div className="flex flex-wrap gap-2">
          {AmenitySchema.options.map((a) => {
            const active = state.amenities.includes(a);
            return (
              <button
                key={a}
                type="button"
                aria-pressed={active}
                onClick={() => toggle(a)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "border-ink bg-ink text-white"
                    : "border-line hover:border-ink",
                )}
              >
                {AMENITY_LABEL[a]}
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

export function PricingStep({ state, errors, set }: StepProps) {
  const price = toInput(state).price;
  return (
    <div className="flex flex-col gap-6">
      <Input
        label="Título del anuncio"
        placeholder="Apartamento con vista en Rosales"
        maxLength={90}
        value={state.title}
        onChange={(e) => set({ title: e.target.value })}
        error={errors.title}
      />
      <Input
        label="Precio de venta (COP)"
        inputMode="numeric"
        placeholder="$450.000.000"
        value={Number.isFinite(price) ? formatCOP(price) : state.price}
        onChange={(e) => set({ price: e.target.value.replace(/\D/g, "") })}
        error={errors.price}
      />
      <div className="flex flex-col gap-1.5">
        <label htmlFor="publish-description" className="text-sm font-medium">
          Descripción
        </label>
        <textarea
          id="publish-description"
          rows={6}
          maxLength={2000}
          value={state.description}
          onChange={(e) => set({ description: e.target.value })}
          aria-invalid={errors.description ? true : undefined}
          aria-describedby="publish-description-hint"
          className="border-line-strong focus:border-ink focus-visible:ring-ink aria-invalid:border-danger w-full rounded-sm border px-3 py-2.5 focus:outline-none focus-visible:ring-2"
          placeholder="Lo que hace especial a tu inmueble: iluminación, remodelaciones, cercanías…"
        />
        <p
          id="publish-description-hint"
          className={cn(
            "text-sm",
            errors.description ? "text-danger" : "text-ink-subtle",
          )}
        >
          {errors.description ?? `${state.description.length}/2000`}
        </p>
      </div>
    </div>
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="bg-surface/95 text-ink shadow-pill hover:bg-surface flex size-8 items-center justify-center rounded-full disabled:opacity-30"
    >
      {children}
    </button>
  );
}

export function ImagesStep({ state, errors, set }: StepProps) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const left = MAX_IMAGES - state.images.length;

  const add = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    const picked = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .slice(0, left);
    const added = await Promise.all(
      picked.map(async (f, i) => ({
        id: `${Date.now()}-${i}`,
        name: f.name,
        url: await imageToDataUrl(f),
      })),
    );
    set((cur) => ({ images: [...cur.images, ...added].slice(0, MAX_IMAGES) }));
    setBusy(false);
    if (input.current) input.current.value = "";
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-ink-muted">
        Necesitas al menos {MIN_IMAGES} fotos (máximo {MAX_IMAGES}). La primera
        es la portada.
      </p>
      <label
        className={cn(
          "border-line-strong hover:border-ink flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed px-6 py-10 text-center",
          left <= 0 && "pointer-events-none opacity-50",
        )}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          void add(e.dataTransfer.files);
        }}
      >
        <ImagePlus className="size-8" aria-hidden />
        <span className="font-semibold">
          {busy
            ? "Procesando fotos…"
            : "Arrastra tus fotos o haz clic para subirlas"}
        </span>
        <span className="text-ink-subtle text-sm">
          JPG o PNG · {state.images.length}/{MAX_IMAGES}
        </span>
        <input
          ref={input}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          aria-label="Subir fotos"
          disabled={left <= 0}
          onChange={(e) => void add(e.target.files)}
        />
      </label>
      <ErrorText>{errors.images}</ErrorText>
      {state.images.length ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {state.images.map((img, i) => (
            <li
              key={img.id}
              className="group bg-surface-muted relative aspect-[4/3] overflow-hidden rounded-md"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={`Foto ${i + 1}: ${img.name}`}
                className="h-full w-full object-cover"
              />
              {i === 0 ? (
                <span className="bg-surface shadow-pill absolute top-2 left-2 rounded-full px-2.5 py-1 text-xs font-semibold">
                  Portada
                </span>
              ) : null}
              <div className="absolute inset-x-2 bottom-2 flex justify-between">
                <div className="flex gap-1.5">
                  <IconButton
                    label="Mover a la izquierda"
                    disabled={i === 0}
                    onClick={() =>
                      set({ images: moveImage(state.images, i, i - 1) })
                    }
                  >
                    <ArrowLeft className="size-4" aria-hidden />
                  </IconButton>
                  <IconButton
                    label="Mover a la derecha"
                    disabled={i === state.images.length - 1}
                    onClick={() =>
                      set({ images: moveImage(state.images, i, i + 1) })
                    }
                  >
                    <ArrowRight className="size-4" aria-hidden />
                  </IconButton>
                </div>
                <div className="flex gap-1.5">
                  {i > 0 ? (
                    <IconButton
                      label="Usar como portada"
                      onClick={() =>
                        set({ images: moveImage(state.images, i, 0) })
                      }
                    >
                      <Star className="size-4" aria-hidden />
                    </IconButton>
                  ) : null}
                  <IconButton
                    label="Eliminar foto"
                    onClick={() =>
                      set({
                        images: state.images.filter((x) => x.id !== img.id),
                      })
                    }
                  >
                    <Trash2 className="size-4" aria-hidden />
                  </IconButton>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function DocumentsStep({ state, errors, set }: StepProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-ink-muted">
        Los usamos para validar el inmueble. No se publican.
      </p>
      <ul className="flex flex-col gap-3">
        {REQUIRED_DOCUMENTS.map((kind) => {
          const doc = state.documents[kind];
          const id = `doc-${kind}`;
          return (
            <li
              key={kind}
              className="border-line flex items-center gap-4 rounded-md border p-4"
            >
              <FileText
                className={cn(
                  "size-6 shrink-0",
                  doc ? "text-success" : "text-ink-subtle",
                )}
                aria-hidden
              />
              <div className="min-w-0 flex-1">
                <p className="font-medium">{DOCUMENT_KIND_LABEL[kind]}</p>
                <p className="text-ink-muted truncate text-sm">
                  {doc ? `${doc.fileName} · ${doc.sizeKb} KB` : "PDF o imagen"}
                </p>
              </div>
              <label
                htmlFor={id}
                className="border-ink hover:bg-surface-muted flex cursor-pointer items-center gap-1.5 rounded-sm border px-3 py-1.5 text-sm font-semibold"
              >
                <Upload className="size-4" aria-hidden />
                {doc ? "Reemplazar" : "Subir"}
              </label>
              <input
                id={id}
                type="file"
                accept="application/pdf,image/*"
                className="sr-only"
                aria-label={`Subir ${DOCUMENT_KIND_LABEL[kind]}`}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  set({
                    documents: {
                      ...state.documents,
                      [kind]: {
                        fileName: f.name,
                        sizeKb: Math.max(1, Math.round(f.size / 1024)),
                      },
                    },
                  });
                }}
              />
            </li>
          );
        })}
      </ul>
      <ErrorText>{errors.documents}</ErrorText>
    </div>
  );
}

export function SummaryStep({ state, errors }: StepProps) {
  const input = toInput(state);
  const rows: [string, string][] = [
    ["Tipo", state.type ? PROPERTY_TYPE_LABEL[state.type] : "—"],
    ["Ubicación", `${state.neighborhood}, ${state.city}`],
    ["Dirección", state.address],
    [
      "Características",
      `${state.bedrooms} hab · ${state.bathrooms} baños · ${state.areaM2} m² · ${state.parking} parq. · estrato ${state.stratum}`,
    ],
    ["Precio", Number.isFinite(input.price) ? formatCOP(input.price) : "—"],
    ["Fotos", `${state.images.length}`],
    [
      "Documentos",
      `${Object.keys(state.documents).length} de ${REQUIRED_DOCUMENTS.length}`,
    ],
  ];
  const cover = state.images[0];
  return (
    <div className="flex flex-col gap-6">
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cover.url}
          alt="Portada"
          className="aspect-[16/9] w-full rounded-lg object-cover"
        />
      ) : null}
      <div>
        <h3 className="text-xl font-semibold">{state.title}</h3>
        <p className="text-ink-muted mt-2 whitespace-pre-line">
          {state.description}
        </p>
      </div>
      <dl className="divide-line border-line divide-y rounded-md border">
        {rows.map(([k, v]) => (
          <div key={k} className="flex gap-4 px-4 py-3 text-sm">
            <dt className="text-ink-muted w-32 shrink-0">{k}</dt>
            <dd className="font-medium">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="bg-surface-muted text-ink-muted rounded-md p-4 text-sm">
        Al enviarlo, un Admin de Habi revisará los datos, las fotos y los
        documentos. Verás el resultado en “Mis inmuebles”.
      </p>
      <ErrorText>{errors.form}</ErrorText>
    </div>
  );
}

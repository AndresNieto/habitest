import { z } from "zod";
import { REQUIRED_DOCUMENTS, MIN_IMAGES } from "@/domain/rules";
import {
  PropertyInputSchema,
  type Amenity,
  type DocumentKind,
  type PropertyInput,
  type PropertyType,
} from "@/domain/schemas";
import type { DraftData } from "@/data";

export const MAX_IMAGES = 10;

export type WizardImage = { id: string; url: string; name: string };
export type WizardDocument = { fileName: string; sizeKb: number };

/** Form state: text inputs stay strings until validated. */
export type WizardState = {
  type: PropertyType | "";
  city: string;
  neighborhood: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  areaM2: string;
  stratum: string;
  amenities: Amenity[];
  title: string;
  price: string;
  description: string;
  images: WizardImage[];
  documents: Partial<Record<DocumentKind, WizardDocument>>;
};

export const EMPTY_STATE: WizardState = {
  type: "",
  city: "",
  neighborhood: "",
  address: "",
  bedrooms: 2,
  bathrooms: 1,
  parking: 0,
  areaM2: "",
  stratum: "",
  amenities: [],
  title: "",
  price: "",
  description: "",
  images: [],
  documents: {},
};

export const STEPS = [
  { key: "location", title: "¿Qué tipo de inmueble es y dónde está?" },
  { key: "features", title: "Cuéntanos cómo es" },
  { key: "pricing", title: "Precio y descripción" },
  { key: "images", title: "Agrega fotos" },
  { key: "documents", title: "Adjunta los documentos" },
  { key: "summary", title: "Revisa y envía" },
] as const;

export type Errors = Partial<Record<string, string>>;

const digits = (s: string) => s.replace(/\D/g, "");
const toNumber = (s: string) =>
  s.trim() === "" ? NaN : Number(s.replace(",", "."));

/** Converts the form state into the domain input shape (may be invalid). */
export function toInput(s: WizardState) {
  return {
    type: s.type || undefined,
    city: s.city,
    neighborhood: s.neighborhood,
    address: s.address,
    bedrooms: s.bedrooms,
    bathrooms: s.bathrooms,
    parking: s.parking,
    areaM2: toNumber(s.areaM2),
    stratum: toNumber(s.stratum),
    amenities: s.amenities,
    title: s.title,
    price: digits(s.price) ? Number(digits(s.price)) : NaN,
    description: s.description,
  };
}

const STEP_FIELDS: Partial<Record<number, (keyof PropertyInput)[]>> = {
  0: ["type", "city", "neighborhood", "address"],
  1: ["bedrooms", "bathrooms", "parking", "areaM2", "stratum", "amenities"],
  2: ["title", "price", "description"],
};

function zodErrors(result: z.ZodSafeParseResult<unknown>): Errors {
  if (result.success) return {};
  const errors: Errors = {};
  for (const issue of result.error.issues) {
    const key = String(issue.path[0] ?? "form");
    errors[key] ??= issue.message;
  }
  return errors;
}

/** Validates one step; an empty object means the step is complete. */
export function validateStep(step: number, s: WizardState): Errors {
  const fields = STEP_FIELDS[step];
  if (fields) {
    const mask = Object.fromEntries(fields.map((f) => [f, true])) as Record<
      keyof PropertyInput,
      true
    >;
    return zodErrors(PropertyInputSchema.pick(mask).safeParse(toInput(s)));
  }
  if (step === 3 && s.images.length < MIN_IMAGES)
    return { images: `Agrega al menos ${MIN_IMAGES} fotos.` };
  if (step === 4) {
    const missing = REQUIRED_DOCUMENTS.filter((k) => !s.documents[k]);
    if (missing.length)
      return { documents: "Adjunta los 3 documentos obligatorios." };
  }
  if (step === 5) {
    for (let i = 0; i < 5; i++) {
      const e = validateStep(i, s);
      if (Object.keys(e).length) return { ...e, step: String(i) };
    }
  }
  return {};
}

/** Builds the repository payload; throws if the state is incomplete. */
export function toDraftData(s: WizardState): DraftData {
  const input = PropertyInputSchema.parse(toInput(s));
  return {
    input,
    images: s.images.map((img, i) => ({
      url: img.url,
      alt: `${input.title}, foto ${i + 1}`,
    })),
    documents: REQUIRED_DOCUMENTS.map((kind) => ({
      kind,
      ...s.documents[kind]!,
    })),
  };
}

/** Moves the image at `from` to `to` (used for reorder and "set as cover"). */
export function moveImage(images: WizardImage[], from: number, to: number) {
  if (to < 0 || to >= images.length || from === to) return images;
  const next = [...images];
  const [img] = next.splice(from, 1);
  next.splice(to, 0, img!);
  return next;
}

// --- Draft persistence -----------------------------------------------------

const draftKey = (userId: string) => `habi.publishDraft.${userId}`;

export type SavedDraft = { step: number; state: WizardState };

export function loadDraft(userId: string): SavedDraft | null {
  try {
    const raw = localStorage.getItem(draftKey(userId));
    if (!raw) return null;
    const d = JSON.parse(raw) as SavedDraft;
    return { step: d.step, state: { ...EMPTY_STATE, ...d.state } };
  } catch {
    return null;
  }
}

/** Returns false if the browser refused to store it (e.g. quota exceeded). */
export function saveDraft(userId: string, draft: SavedDraft): boolean {
  try {
    localStorage.setItem(draftKey(userId), JSON.stringify(draft));
    return true;
  } catch {
    return false;
  }
}

export function clearDraft(userId: string) {
  try {
    localStorage.removeItem(draftKey(userId));
  } catch {
    // ignore
  }
}

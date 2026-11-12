import { describe, expect, it } from "vitest";
import {
  EMPTY_STATE,
  loadDraft,
  moveImage,
  saveDraft,
  toDraftData,
  validateStep,
  type WizardState,
} from "./wizard-state";

const img = (id: string) => ({
  id,
  url: `data:image/jpeg;base64,${id}`,
  name: `${id}.jpg`,
});

export const COMPLETE: WizardState = {
  ...EMPTY_STATE,
  type: "apartment",
  city: "Bogotá",
  neighborhood: "Chapinero",
  address: "Calle 60 # 7-20",
  bedrooms: 2,
  bathrooms: 2,
  parking: 1,
  areaM2: "75,5",
  stratum: "4",
  amenities: ["porteria"],
  title: "Apartamento en Chapinero",
  price: "420000000",
  description: "Apartamento remodelado, iluminado y cerca de todo.",
  images: [img("a"), img("b"), img("c")],
  documents: {
    certificado_tradicion: { fileName: "ct.pdf", sizeKb: 120 },
    escritura: { fileName: "esc.pdf", sizeKb: 300 },
    predial: { fileName: "pred.pdf", sizeKb: 80 },
  },
};

describe("wizard validation", () => {
  it("reports Spanish errors per step", () => {
    expect(validateStep(0, EMPTY_STATE)).toMatchObject({
      type: "Selecciona el tipo de inmueble",
      city: "Ingresa la ciudad",
    });
    expect(validateStep(1, EMPTY_STATE)).toMatchObject({
      areaM2: "Ingresa el área",
      stratum: "Selecciona el estrato",
    });
    expect(validateStep(2, { ...EMPTY_STATE, price: "5000" }).price).toBe(
      "El precio mínimo es $10.000.000",
    );
    expect(
      validateStep(3, { ...EMPTY_STATE, images: [img("a")] }).images,
    ).toMatch(/al menos 3/);
    expect(validateStep(4, EMPTY_STATE).documents).toBeDefined();
  });

  it("passes every step for a complete form and builds the payload", () => {
    for (let i = 0; i < 6; i++) expect(validateStep(i, COMPLETE)).toEqual({});
    const data = toDraftData(COMPLETE);
    expect(data.input).toMatchObject({
      price: 420_000_000,
      areaM2: 75.5,
      stratum: 4,
    });
    expect(data.images).toHaveLength(3);
    expect(data.documents.map((d) => d.kind)).toEqual([
      "certificado_tradicion",
      "escritura",
      "predial",
    ]);
  });

  it("summary points back to the first incomplete step", () => {
    expect(validateStep(5, { ...COMPLETE, images: [] }).step).toBe("3");
  });
});

describe("images and drafts", () => {
  it("reorders and sets the cover", () => {
    const list = [img("a"), img("b"), img("c")];
    expect(moveImage(list, 2, 0).map((i) => i.id)).toEqual(["c", "a", "b"]);
    expect(moveImage(list, 0, 1).map((i) => i.id)).toEqual(["b", "a", "c"]);
    expect(moveImage(list, 0, -1)).toBe(list);
  });

  it("persists and restores the draft per user", () => {
    localStorage.clear();
    expect(loadDraft("u-tenant-1")).toBeNull();
    saveDraft("u-tenant-1", { step: 3, state: COMPLETE });
    expect(loadDraft("u-tenant-1")).toEqual({ step: 3, state: COMPLETE });
    expect(loadDraft("u-tenant-2")).toBeNull();
  });
});

import { z } from "zod";

export const RoleSchema = z.enum(["tenant", "admin", "broker"]);
export type Role = z.infer<typeof RoleSchema>;

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.email(),
  phone: z.string(),
  role: RoleSchema,
});
export type User = z.infer<typeof UserSchema>;

export const PropertyStatusSchema = z.enum([
  "draft",
  "pending_review",
  "approved",
  "rejected",
]);
export type PropertyStatus = z.infer<typeof PropertyStatusSchema>;

export const PropertyTypeSchema = z.enum([
  "house",
  "apartment",
  "penthouse",
  "country_house",
]);
export type PropertyType = z.infer<typeof PropertyTypeSchema>;

export const PROPERTY_TYPE_LABEL: Record<PropertyType, string> = {
  house: "Casa",
  apartment: "Apartamento",
  penthouse: "Penthouse",
  country_house: "Casa campestre",
};

export const PropertyImageSchema = z.object({
  id: z.string(),
  url: z.string().min(1),
  alt: z.string(),
});
export type PropertyImage = z.infer<typeof PropertyImageSchema>;

export const DocumentKindSchema = z.enum([
  "certificado_tradicion",
  "escritura",
  "predial",
]);
export type DocumentKind = z.infer<typeof DocumentKindSchema>;

export const DOCUMENT_KIND_LABEL: Record<DocumentKind, string> = {
  certificado_tradicion: "Certificado de tradición y libertad",
  escritura: "Escritura pública",
  predial: "Impuesto predial",
};

export const PropertyDocumentSchema = z.object({
  id: z.string(),
  kind: DocumentKindSchema,
  fileName: z.string().min(1),
  sizeKb: z.number().int().positive(),
  uploadedAt: z.iso.datetime(),
});
export type PropertyDocument = z.infer<typeof PropertyDocumentSchema>;

export const AmenitySchema = z.enum([
  "porteria",
  "ascensor",
  "gimnasio",
  "piscina",
  "balcon",
  "terraza",
  "jardin",
  "chimenea",
  "bbq",
  "zonas_verdes",
  "estudio",
  "parque_infantil",
]);
export type Amenity = z.infer<typeof AmenitySchema>;

export const AMENITY_LABEL: Record<Amenity, string> = {
  porteria: "Portería 24 horas",
  ascensor: "Ascensor",
  gimnasio: "Gimnasio",
  piscina: "Piscina",
  balcon: "Balcón",
  terraza: "Terraza",
  jardin: "Jardín",
  chimenea: "Chimenea",
  bbq: "Zona BBQ",
  zonas_verdes: "Zonas verdes",
  estudio: "Estudio",
  parque_infantil: "Parque infantil",
};

/** Editable data a Tenant provides when publishing. */
const num = (msg = "Ingresa un número válido") => z.number({ error: msg });

export const PropertyInputSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "El título debe tener al menos 5 caracteres")
    .max(90, "Máximo 90 caracteres"),
  description: z
    .string()
    .trim()
    .min(20, "Describe el inmueble con al menos 20 caracteres")
    .max(2000, "Máximo 2.000 caracteres"),
  type: z.enum(PropertyTypeSchema.options, {
    error: "Selecciona el tipo de inmueble",
  }),
  price: num("Ingresa el precio")
    .int()
    .min(10_000_000, "El precio mínimo es $10.000.000")
    .max(100_000_000_000, "Revisa el precio"),
  city: z.string().trim().min(2, "Ingresa la ciudad"),
  neighborhood: z.string().trim().min(2, "Ingresa el barrio"),
  address: z.string().trim().min(5, "Ingresa la dirección"),
  bedrooms: num().int().min(0).max(20, "Máximo 20"),
  bathrooms: num().int().min(1, "Al menos 1 baño").max(20, "Máximo 20"),
  areaM2: num("Ingresa el área")
    .positive("El área debe ser mayor a 0")
    .max(100_000, "Revisa el área"),
  parking: num().int().min(0).max(20, "Máximo 20"),
  stratum: num("Selecciona el estrato")
    .int()
    .min(1, "Selecciona el estrato")
    .max(6, "Selecciona el estrato"),
  amenities: z.array(AmenitySchema).max(12),
});
export type PropertyInput = z.infer<typeof PropertyInputSchema>;

export const PropertySchema = PropertyInputSchema.extend({
  id: z.string(),
  ownerId: z.string(),
  status: PropertyStatusSchema,
  images: z.array(PropertyImageSchema),
  documents: z.array(PropertyDocumentSchema),
  rejectionReason: z.string().optional(),
  createdAt: z.iso.datetime(),
  submittedAt: z.iso.datetime().optional(),
  reviewedAt: z.iso.datetime().optional(),
  reviewedBy: z.string().optional(),
});
export type Property = z.infer<typeof PropertySchema>;

export const VisitStatusSchema = z.enum([
  "scheduled",
  "completed",
  "cancelled",
]);
export type VisitStatus = z.infer<typeof VisitStatusSchema>;

export const VISIT_SLOTS = ["09:00", "11:00", "14:00", "16:00"] as const;

export const VisitSchema = z.object({
  id: z.string(),
  propertyId: z.string(),
  tenantId: z.string(),
  brokerId: z.string(),
  /** Local date, YYYY-MM-DD. */
  date: z.iso.date(),
  slot: z.enum(VISIT_SLOTS),
  status: VisitStatusSchema,
  notes: z.string().optional(),
  createdAt: z.iso.datetime(),
});
export type Visit = z.infer<typeof VisitSchema>;

export const NotaryAppointmentSchema = z.object({
  id: z.string(),
  propertyId: z.string(),
  visitId: z.string(),
  brokerId: z.string(),
  buyerId: z.string(),
  sellerId: z.string(),
  notary: z.string().min(2),
  date: z.iso.date(),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  status: z.enum(["scheduled", "signed", "cancelled"]),
  createdAt: z.iso.datetime(),
});
export type NotaryAppointment = z.infer<typeof NotaryAppointmentSchema>;

export const TransactionSchema = z.object({
  id: z.string(),
  propertyId: z.string(),
  kind: z.enum(["sale", "commission", "publication_fee"]),
  amount: z.number().int(),
  date: z.iso.date(),
  status: z.enum(["pending", "paid"]),
});
export type Transaction = z.infer<typeof TransactionSchema>;

import type {
  Amenity,
  NotaryAppointment,
  Property,
  PropertyDocument,
  PropertyType,
  Transaction,
  User,
  Visit,
} from "@/domain/schemas";

export type Db = {
  version: number;
  users: User[];
  properties: Property[];
  visits: Visit[];
  notaryAppointments: NotaryAppointment[];
  transactions: Transaction[];
};

export const DB_VERSION = 2;

export const USERS: User[] = [
  {
    id: "u-tenant-1",
    name: "Laura Gómez",
    email: "laura@habi.demo",
    phone: "+57 310 555 0101",
    role: "tenant",
  },
  {
    id: "u-tenant-2",
    name: "Santiago Pérez",
    email: "santiago@habi.demo",
    phone: "+57 311 555 0102",
    role: "tenant",
  },
  {
    id: "u-tenant-3",
    name: "Valentina Ríos",
    email: "valentina@habi.demo",
    phone: "+57 312 555 0103",
    role: "tenant",
  },
  {
    id: "u-admin-1",
    name: "Andrea Molina",
    email: "andrea@habi.demo",
    phone: "+57 313 555 0201",
    role: "admin",
  },
  {
    id: "u-broker-1",
    name: "Camilo Rojas",
    email: "camilo@habi.demo",
    phone: "+57 314 555 0301",
    role: "broker",
  },
  {
    id: "u-broker-2",
    name: "Daniela Castro",
    email: "daniela@habi.demo",
    phone: "+57 315 555 0302",
    role: "broker",
  },
  {
    id: "u-broker-3",
    name: "Julián Herrera",
    email: "julian@habi.demo",
    phone: "+57 316 555 0303",
    role: "broker",
  },
];

const EXTERIORS = [
  "1568605114967-8130f3a36994",
  "1570129477492-45c003edd2be",
  "1564013799919-ab600027ffc6",
  "1512917774080-9991f1c4c750",
  "1600596542815-ffad4c1539a9",
  "1600585154340-be6161a56a0c",
  "1605276374104-dee2a0ed3cd6",
  "1580587771525-78b9dba3b914",
  "1613490493576-7fde63acd811",
  "1600047509807-ba8f99d2cdde",
  "1598228723793-52759bba239c",
  "1599809275671-b5942cabc7a2",
  "1583608205776-bfd35f0d9f83",
  "1576941089067-2de3c901e126",
  "1572120360610-d971b9d7767c",
  "1558036117-15d82a90b9b1",
  "1416331108676-a22ccb276e35",
  "1449844908441-8829872d2607",
  "1518780664697-55e3ad937233",
  "1523217582562-09d0def993a6",
  "1600585154526-990dced4db0d",
  "1545324418-cc1a3fa10c00",
  "1560448204-e02f11c3d0e2",
  "1574362848149-11496d93a7c7",
];
const INTERIORS = [
  "1600607687939-ce8a6c25118c",
  "1600566753190-17f0baa2a6c3",
  "1502672260266-1c1ef2d93688",
  "1522708323590-d24dbb6b0267",
  "1493809842364-78817add7ffb",
  "1484154218962-a197022b5858",
  "1556909114-f6e7ad7d3136",
  "1586023492125-27b2c045efd7",
  "1554995207-c18c203602cb",
  "1505691938895-1758d7feb511",
  "1540518614846-7eded433c457",
  "1552321554-5fefe8c9ef14",
  "1507089947368-19c1da9775ae",
  "1600210492486-724fe5c67fb0",
  "1600573472550-8090b5e0745e",
  "1600607687644-c7171b42498f",
];

export const unsplash = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

type Row = [
  title: string,
  type: PropertyType,
  city: string,
  neighborhood: string,
  price: number,
  bedrooms: number,
  bathrooms: number,
  areaM2: number,
  parking: number,
  stratum: number,
  status: Property["status"],
  ownerId: string,
];

const ROWS: Row[] = [
  [
    "Casa moderna con jardín en Chicó",
    "house",
    "Bogotá",
    "Chicó Norte",
    1_850_000_000,
    4,
    4,
    280,
    2,
    6,
    "approved",
    "u-tenant-2",
  ],
  [
    "Apartamento con vista en Rosales",
    "apartment",
    "Bogotá",
    "Rosales",
    980_000_000,
    3,
    3,
    145,
    2,
    6,
    "approved",
    "u-tenant-3",
  ],
  [
    "Apartamento luminoso en Cedritos",
    "apartment",
    "Bogotá",
    "Cedritos",
    520_000_000,
    3,
    2,
    92,
    1,
    4,
    "approved",
    "u-tenant-2",
  ],
  [
    "Apartaestudio en Chapinero Alto",
    "apartment",
    "Bogotá",
    "Chapinero Alto",
    340_000_000,
    1,
    1,
    48,
    0,
    4,
    "approved",
    "u-tenant-3",
  ],
  [
    "Penthouse en El Poblado",
    "penthouse",
    "Medellín",
    "El Poblado",
    2_100_000_000,
    4,
    5,
    320,
    3,
    6,
    "approved",
    "u-tenant-2",
  ],
  [
    "Apartamento en Laureles cerca al estadio",
    "apartment",
    "Medellín",
    "Laureles",
    610_000_000,
    3,
    2,
    110,
    1,
    5,
    "approved",
    "u-tenant-3",
  ],
  [
    "Casa en Envigado con terraza",
    "house",
    "Medellín",
    "Envigado",
    890_000_000,
    4,
    3,
    210,
    2,
    5,
    "approved",
    "u-tenant-2",
  ],
  [
    "Casa campestre en Llanogrande",
    "country_house",
    "Rionegro",
    "Llanogrande",
    1_450_000_000,
    5,
    5,
    450,
    4,
    6,
    "approved",
    "u-tenant-3",
  ],
  [
    "Apartamento en Ciudad Jardín",
    "apartment",
    "Cali",
    "Ciudad Jardín",
    480_000_000,
    3,
    2,
    105,
    1,
    5,
    "approved",
    "u-tenant-2",
  ],
  [
    "Casa familiar en El Ingenio",
    "house",
    "Cali",
    "El Ingenio",
    720_000_000,
    4,
    3,
    190,
    2,
    5,
    "approved",
    "u-tenant-3",
  ],
  [
    "Apartamento frente al mar en Bocagrande",
    "apartment",
    "Cartagena",
    "Bocagrande",
    1_150_000_000,
    3,
    3,
    130,
    1,
    6,
    "approved",
    "u-tenant-2",
  ],
  [
    "Casa colonial en Getsemaní",
    "house",
    "Cartagena",
    "Getsemaní",
    1_600_000_000,
    4,
    4,
    240,
    0,
    4,
    "approved",
    "u-tenant-3",
  ],
  [
    "Apartamento en Alto Prado",
    "apartment",
    "Barranquilla",
    "Alto Prado",
    560_000_000,
    3,
    3,
    120,
    2,
    6,
    "approved",
    "u-tenant-2",
  ],
  [
    "Casa en Villa Country",
    "house",
    "Barranquilla",
    "Villa Country",
    830_000_000,
    4,
    4,
    230,
    2,
    5,
    "approved",
    "u-tenant-3",
  ],
  [
    "Apartamento en Cabecera",
    "apartment",
    "Bucaramanga",
    "Cabecera del Llano",
    390_000_000,
    3,
    2,
    88,
    1,
    5,
    "approved",
    "u-tenant-2",
  ],
  [
    "Casa campestre en Cerritos",
    "country_house",
    "Pereira",
    "Cerritos",
    980_000_000,
    4,
    4,
    380,
    3,
    6,
    "approved",
    "u-tenant-3",
  ],
  [
    "Apartamento nuevo en Pinares",
    "apartment",
    "Pereira",
    "Pinares",
    310_000_000,
    2,
    2,
    70,
    1,
    4,
    "approved",
    "u-tenant-2",
  ],
  [
    "Casa en Usaquén con chimenea",
    "house",
    "Bogotá",
    "Usaquén",
    1_250_000_000,
    4,
    4,
    260,
    2,
    5,
    "approved",
    "u-tenant-3",
  ],
  [
    "Apartamento en Salitre",
    "apartment",
    "Bogotá",
    "Ciudad Salitre",
    450_000_000,
    3,
    2,
    82,
    1,
    4,
    "pending_review",
    "u-tenant-1",
  ],
  [
    "Casa en Belén con patio",
    "house",
    "Medellín",
    "Belén",
    560_000_000,
    3,
    2,
    140,
    1,
    4,
    "pending_review",
    "u-tenant-2",
  ],
  [
    "Penthouse en Granada",
    "penthouse",
    "Cali",
    "Granada",
    1_300_000_000,
    3,
    4,
    210,
    2,
    6,
    "pending_review",
    "u-tenant-3",
  ],
  [
    "Apartamento en Teusaquillo",
    "apartment",
    "Bogotá",
    "Teusaquillo",
    380_000_000,
    2,
    1,
    65,
    0,
    4,
    "rejected",
    "u-tenant-1",
  ],
  [
    "Casa en Manga",
    "house",
    "Cartagena",
    "Manga",
    700_000_000,
    3,
    3,
    170,
    1,
    4,
    "rejected",
    "u-tenant-2",
  ],
  [
    "Apartamento en Suba (borrador)",
    "apartment",
    "Bogotá",
    "Suba",
    290_000_000,
    2,
    2,
    60,
    1,
    3,
    "draft",
    "u-tenant-1",
  ],
];

const DESCRIPTIONS: Record<PropertyType, string> = {
  house:
    "Casa amplia y bien iluminada, con zonas sociales integradas, cocina abierta y patio. Ideal para familias que buscan espacio y tranquilidad en un sector con excelente acceso a colegios, comercio y transporte.",
  apartment:
    "Apartamento remodelado con acabados modernos, balcón y excelente iluminación natural. Conjunto con portería 24 horas, gimnasio y zonas verdes. Cerca de centros comerciales y vías principales.",
  penthouse:
    "Penthouse de dos niveles con terraza privada y vista panorámica. Acabados de lujo, cocina integral, estudio y ascensor directo. Edificio con piscina, gimnasio y salón social.",
  country_house:
    "Casa campestre rodeada de naturaleza, con amplias zonas verdes, chimenea y kiosco BBQ. A pocos minutos de la ciudad, perfecta para vivir con calma o como segunda vivienda.",
};

const AMENITIES: Record<PropertyType, Amenity[]> = {
  house: ["jardin", "chimenea", "bbq", "estudio", "terraza"],
  apartment: [
    "porteria",
    "ascensor",
    "gimnasio",
    "balcon",
    "zonas_verdes",
    "parque_infantil",
  ],
  penthouse: [
    "porteria",
    "ascensor",
    "piscina",
    "gimnasio",
    "terraza",
    "estudio",
  ],
  country_house: ["jardin", "piscina", "chimenea", "bbq", "zonas_verdes"],
};

const iso = (d: string) => new Date(`${d}T15:00:00.000Z`).toISOString();

function docs(propertyId: string, date: string): PropertyDocument[] {
  return (["certificado_tradicion", "escritura", "predial"] as const).map(
    (kind, i) => ({
      id: `${propertyId}-doc-${i + 1}`,
      kind,
      fileName: `${kind}.pdf`,
      sizeKb: 180 + i * 95,
      uploadedAt: iso(date),
    }),
  );
}

function buildProperties(): Property[] {
  return ROWS.map((r, i) => {
    const [
      title,
      type,
      city,
      neighborhood,
      price,
      bedrooms,
      bathrooms,
      areaM2,
      parking,
      stratum,
      status,
      ownerId,
    ] = r;
    const id = `p-${String(i + 1).padStart(3, "0")}`;
    const day = String(28 - i).padStart(2, "0");
    const created = `2026-10-${day}`;
    const imageIds = [
      EXTERIORS[i % EXTERIORS.length]!,
      INTERIORS[(i * 2) % INTERIORS.length]!,
      INTERIORS[(i * 2 + 1) % INTERIORS.length]!,
      INTERIORS[(i * 2 + 5) % INTERIORS.length]!,
      INTERIORS[(i * 2 + 9) % INTERIORS.length]!,
    ];
    const isDraft = status === "draft";
    const property: Property = {
      id,
      ownerId,
      title,
      description: DESCRIPTIONS[type],
      type,
      price,
      city,
      neighborhood,
      address: `Calle ${10 + i * 7} # ${20 + i}-${10 + (i % 80)}`,
      bedrooms,
      bathrooms,
      areaM2,
      parking,
      stratum,
      amenities: AMENITIES[type].filter((_, k) => (k + i) % 4 !== 0),
      status,
      images: (isDraft ? imageIds.slice(0, 1) : imageIds).map((img, k) => ({
        id: `${id}-img-${k + 1}`,
        url: unsplash(img),
        alt: `${title}, foto ${k + 1}`,
      })),
      documents: isDraft ? [] : docs(id, created),
      createdAt: iso(created),
    };
    if (!isDraft) property.submittedAt = iso(created);
    if (status === "approved" || status === "rejected") {
      property.reviewedAt = iso(`2026-11-0${(i % 9) + 1}`);
      property.reviewedBy = "u-admin-1";
    }
    if (status === "rejected") {
      property.rejectionReason =
        i % 2
          ? "La escritura adjunta no corresponde a la dirección del inmueble."
          : "El certificado de tradición tiene más de 30 días de expedido.";
    }
    return property;
  });
}

function buildVisits(): Visit[] {
  const v = (
    id: string,
    propertyId: string,
    tenantId: string,
    brokerId: string,
    date: string,
    slot: Visit["slot"],
    status: Visit["status"],
  ): Visit => ({
    id,
    propertyId,
    tenantId,
    brokerId,
    date,
    slot,
    status,
    createdAt: iso("2026-11-05"),
  });
  return [
    v(
      "v-001",
      "p-002",
      "u-tenant-1",
      "u-broker-1",
      "2026-11-18",
      "09:00",
      "scheduled",
    ),
    v(
      "v-002",
      "p-005",
      "u-tenant-1",
      "u-broker-2",
      "2026-11-19",
      "14:00",
      "scheduled",
    ),
    v(
      "v-003",
      "p-001",
      "u-tenant-3",
      "u-broker-1",
      "2026-11-10",
      "11:00",
      "completed",
    ),
    v(
      "v-004",
      "p-011",
      "u-tenant-1",
      "u-broker-3",
      "2026-11-08",
      "16:00",
      "completed",
    ),
  ];
}

function buildNotary(): NotaryAppointment[] {
  return [
    {
      id: "n-001",
      propertyId: "p-001",
      visitId: "v-003",
      brokerId: "u-broker-1",
      buyerId: "u-tenant-3",
      sellerId: "u-tenant-2",
      notary: "Notaría 13 de Bogotá",
      date: "2026-11-24",
      time: "10:00",
      status: "scheduled",
      createdAt: iso("2026-11-11"),
    },
  ];
}

function buildTransactions(properties: Property[]): Transaction[] {
  const tx: Transaction[] = [];
  properties
    .filter((p) => p.status !== "draft")
    .forEach((p, i) => {
      tx.push({
        id: `t-${p.id}-fee`,
        propertyId: p.id,
        kind: "publication_fee",
        amount: 150_000,
        date: (p.submittedAt ?? p.createdAt).slice(0, 10),
        status: i % 4 === 0 ? "pending" : "paid",
      });
    });
  const sold = properties.find((p) => p.id === "p-011")!;
  tx.push(
    {
      id: "t-sale-1",
      propertyId: sold.id,
      kind: "sale",
      amount: sold.price,
      date: "2026-11-10",
      status: "paid",
    },
    {
      id: "t-comm-1",
      propertyId: sold.id,
      kind: "commission",
      amount: Math.round(sold.price * 0.03),
      date: "2026-11-10",
      status: "paid",
    },
  );
  return tx;
}

export function createSeed(): Db {
  const properties = buildProperties();
  return {
    version: DB_VERSION,
    users: USERS,
    properties,
    visits: buildVisits(),
    notaryAppointments: buildNotary(),
    transactions: buildTransactions(properties),
  };
}

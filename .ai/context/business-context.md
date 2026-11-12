# Business Context

Durable product and domain facts agents need to make correct decisions. Keep it short; link to the knowledge base for long-form material.

## Product

- Purpose: Habi is a marketplace to **buy and sell homes**. People publish properties for sale, the platform validates them (documents and data), and buyers browse validated listings and schedule visits guided by a Broker. The UX follows Airbnb-style marketplace patterns, applied to home sales instead of stays.
- Delivery: an installable **PWA**, mobile-first and responsive to desktop.
- MVP constraint: **mock data only**. No backend, database, real auth, payments, or e-signature. All data is seeded in the client and persisted to `localStorage` behind repository interfaces (see `project-profile.md`), so a real API can replace them later.
- Locale (assumption, confirm before release): UI in Spanish (`es-CO`), prices in COP, Colombian cities in the seed.
- Primary users / personas:

| Role | Who | Can do |
| --- | --- | --- |
| Tenant | End user of the platform (buyer and/or seller) | browse and search listings; view detail; publish a property for sale (data, images, documents); track own listings and review outcome; schedule visits to validated properties; see assigned broker and notary appointments |
| Admin | Platform operator | review publication requests (data, images, documents); approve or reject with reason; oversee finances (mock KPIs and transactions) |
| Broker | Field agent of the platform | see assigned visits; show properties; mark visit outcome; schedule notary appointments to sign documents |

- Key user journeys:
  1. **Browse**: anyone (no session needed) -> home grid of approved properties -> search/filter -> property detail.
  2. **Publish**: Tenant -> multi-step wizard (location, features, price, images, documents) -> submit -> `pending_review` -> sees status in "Mis inmuebles".
  3. **Review**: Admin -> review queue -> inspect data, images and documents -> approve (`approved`, goes public) or reject with reason (`rejected`, Tenant sees reason).
  4. **Visit**: Tenant -> approved property detail -> "Agendar visita" -> pick date/slot -> broker auto-assigned -> visit appears for Tenant and Broker.
  5. **Close**: Broker -> marks visit done -> schedules notary appointment -> parties see it in their agenda.
  6. **Finance**: Admin -> mock KPIs and transactions.

Ticket breakdown: epic [#1](https://github.com/AndresNieto/habitest/issues/1), tickets HB-2..HB-14 on Habi Board.

## Sources Of Truth

| Concern | Owner | Notes |
| --- | --- | --- |
| Scope and acceptance criteria | Issue tracker (GitHub Issues) | the ticket is authoritative for intent |
| Durable decisions, stakeholder docs | Knowledge base | none configured; this file + tickets |
| Visual and interaction design | Engineer decision (Airbnb-style reference, own brand) | no design source file yet |
| Implementation reality | Code | wins on implementation facts |
| Remote PR / review / CI state | GitHub | wins on remote state |
| Working-tree state | Local Git | wins on unstaged/unpushed facts |
| Trade-offs not covered above | Engineer decision | record who and when |

Conflict rule: prefer code for implementation facts and the tracker/knowledge base for product intent, unless the user says otherwise. Surface every conflict in the response and the ticket docs; never silently pick one. When a design and an acceptance criterion conflict, ask.

## Stakeholders

| Role | Name / team | Cares about |
| --- | --- | --- |
| Product owner | AndresNieto | scope, priority |
| QA | AndresNieto | test scenarios, AC evidence |
| Engineering lead | AndresNieto | architecture, review |

## Business Rules

Domain invariants agents must never break. One line each, with source.

- Property lifecycle is `draft -> pending_review -> approved | rejected`; only an Admin moves a property out of `pending_review`. (product brief 2026-11-12)
- Only `approved` properties appear in public listings, search, and detail for non-owners. (product brief)
- Rejecting a property requires a reason, and the owner Tenant can see it. (HB-10)
- Submitting a property for review requires at least 3 images and the required documents. (HB-9)
- Visits can be scheduled only on `approved` properties and never by the property's owner. (product brief, HB-11)
- Every visit has exactly one assigned Broker, chosen automatically (least visits that day, tie -> seed order); a broker cannot be double-booked in the same slot. (HB-11)
- Notary appointments are created by a Broker, for a property with a completed visit. (HB-12)
- Role access: `/admin/*` Admin only, `/broker/*` Broker only; publishing and scheduling require a Tenant session; browsing is public. (HB-6)
- MVP never sends data to a server: no real PII, payments, or documents leave the browser. (product brief)

## Glossary

| Term | Meaning |
| --- | --- |
| Tenant | Platform end user who buys and/or sells. **Not** a renter: there are no rentals in Habi. |
| Admin | Platform operator who validates properties and oversees finances. |
| Broker | Platform agent who shows properties and coordinates notary signing. |
| Property / Inmueble | A home listed for sale. |
| Listing | The public view of an `approved` property. |
| Review / Validación | Admin check of a property's data, images and documents before it goes public. |
| Visit / Visita | Scheduled in-person showing of a property, attended by a Broker. |
| Notary appointment / Cita de notaría | Appointment at a notary office to sign the sale documents. |
| Certificado de tradición, escritura, predial | Colombian property documents attached on publish (title history, deed, property tax). |
| Mock data | Seeded client-side data persisted in `localStorage`; resettable. |

## Non-Goals

- Real backend, database, or API integration (MVP).
- Real authentication or identity verification; users pick a mock profile.
- Payments, escrow, commissions settlement, or e-signature.
- Rentals or short stays.
- Push notifications, email or SMS.
- Interactive maps that need API keys.
- Copying another brand's identity: Airbnb is a UX reference only.

# HB-5 — Domain + mock data

Issue: [#5](https://github.com/AndresNieto/habitest/issues/5) · Branch: `feature/HB-5-domain-mock-data` · Fast mode.

- `src/domain/schemas.ts`: types + Zod schemas (User, Property, PropertyImage, PropertyDocument, Visit, NotaryAppointment, Transaction) and Spanish UI labels.
- `src/domain/rules.ts`: pure business rules (lifecycle, submission requirements, admin-only review with reason, visits only on approved and not by the owner, broker assignment without double booking, notary after a completed visit).
- `src/data/seed.ts`: 24 properties (18 approved, 3 pending review, 2 rejected, 1 draft) across 9 cities with Unsplash photos; 3 tenants, 1 admin, 3 brokers; visits, notary appointment and transactions.
- `src/data/db.ts` + `src/data/repositories/*`: async repositories with simulated latency, localStorage persistence (`habi.db`) and `resetDb()` ("Restablecer datos demo" in the user menu).
- [x] AC1 · [x] AC2 · [x] AC3 · [x] AC4 · [x] AC5 (22 tests).

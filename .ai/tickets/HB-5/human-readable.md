# HB-5 — Dominio + datos mock

Issue: [#5](https://github.com/AndresNieto/habitest/issues/5) · Branch: `feature/HB-5-domain-mock-data` · Modo rápido.

- `src/domain/schemas.ts`: tipos + esquemas Zod (User, Property, PropertyImage, PropertyDocument, Visit, NotaryAppointment, Transaction) y etiquetas en español.
- `src/domain/rules.ts`: reglas de negocio puras (ciclo de vida, requisitos para enviar a revisión, revisión solo Admin con motivo, visitas solo a aprobados y no del dueño, asignación de broker sin doble reserva, notaría tras visita completada).
- `src/data/seed.ts`: 24 inmuebles (18 aprobados, 3 en revisión, 2 rechazados, 1 borrador) en 9 ciudades, fotos de Unsplash; 3 tenants, 1 admin, 3 brokers; visitas, notaría y transacciones.
- `src/data/db.ts` + `src/data/repositories/*`: repositorios async con latencia simulada, persistencia en localStorage (`habi.db`) y `resetDb()` ("Restablecer datos demo" en el menú).
- [x] AC1 · [x] AC2 · [x] AC3 · [x] AC4 · [x] AC5 (22 tests).

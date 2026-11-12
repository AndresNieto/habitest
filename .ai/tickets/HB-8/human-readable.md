# HB-8 — Detalle del inmueble

Issue: [#8](https://github.com/AndresNieto/habitest/issues/8) · Branch: `feature/HB-8-property-detail` · Modo rápido.

- `/properties/[id]`: galería (mosaico en desktop, carrusel en móvil, vista completa), título, características (habitaciones, baños, área, parqueaderos, estrato), propietario, sello "Validado por Habi" y documentos, descripción, amenidades y mapa OpenStreetMap embebido (ubicación aproximada, sin API key).
- Tarjeta de precio sticky (desktop) y barra inferior sticky (móvil) con CTA según quien mira: invitado → login con regreso; Tenant → `/properties/[id]/visit` (HB-11); dueño/Admin/Broker → nota.
- Inmueble no aprobado: 404 propio salvo para el dueño o Admin, que ven el estado y el motivo de rechazo.
- Amenidades agregadas al dominio (`AmenitySchema`, `DB_VERSION` 2: el localStorage viejo se re-siembra).
- `/login?next=` regresa a la página de origen.
- [x] AC1 · [x] AC2 · [x] AC3 · [x] AC4 · [x] AC5 (31 tests; capturas desktop/móvil).

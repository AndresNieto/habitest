# HB-7 — Listado de inmuebles (home)

Issue: [#7](https://github.com/AndresNieto/habitest/issues/7) · Branch: `feature/HB-7-listings` · Modo rápido.

- Home (`/`) con grilla responsive (1/2/3/4 columnas) de tarjetas: carrusel de fotos, tipo, barrio y ciudad, habitaciones, baños, área y precio en COP.
- Solo inmuebles `approved` (vía `listProperties`).
- Búsqueda (píldora del header, sin tildes), barra de tipos y modal de filtros (precio, habitaciones, baños); todo vive en la URL (`q`, `type`, `minPrice`, `maxPrice`, `bedrooms`, `bathrooms`).
- Skeleton mientras carga y estado vacío con "Limpiar filtros".
- La tarjeta completa enlaza a `/properties/[id]`.
- [x] AC1 · [x] AC2 · [x] AC3 · [x] AC4 · [x] AC5 (26 tests; capturas desktop y móvil).

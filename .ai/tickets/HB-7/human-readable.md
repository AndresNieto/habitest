# HB-7 — Property listings (home)

Issue: [#7](https://github.com/AndresNieto/habitest/issues/7) · Branch: `feature/HB-7-listings` · Fast mode.

- Home (`/`) with a responsive grid (1/2/3/4 columns) of cards: photo carousel, type, neighborhood and city, bedrooms, bathrooms, area and price in COP.
- Only `approved` properties (via `listProperties`).
- Accent-insensitive search (header pill), type bar and filters modal (price, bedrooms, bathrooms); all state lives in the URL (`q`, `type`, `minPrice`, `maxPrice`, `bedrooms`, `bathrooms`).
- Loading skeleton and empty state with "clear filters".
- The whole card links to `/properties/[id]`.
- [x] AC1 · [x] AC2 · [x] AC3 · [x] AC4 · [x] AC5 (26 tests; desktop and mobile screenshots).

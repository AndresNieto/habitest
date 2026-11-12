# HB-8 — Property detail

Issue: [#8](https://github.com/AndresNieto/habitest/issues/8) · Branch: `feature/HB-8-property-detail` · Fast mode.

- `/properties/[id]`: gallery (desktop mosaic, mobile carousel, full-screen view), title, features (bedrooms, bathrooms, area, parking, stratum), owner, "validated by Habi" badge and documents, description, amenities and an embedded OpenStreetMap map (approximate location, no API key).
- Sticky price card (desktop) and sticky bottom bar (mobile) with a viewer-aware CTA: guest → login with return path; Tenant → `/properties/[id]/visit` (HB-11); owner/Admin/Broker → note.
- Non-approved property: dedicated 404 unless the viewer is the owner or an Admin, who see the status and rejection reason.
- Amenities added to the domain (`AmenitySchema`, `DB_VERSION` 2: old localStorage is re-seeded).
- `/login?next=` returns to the originating page.
- [x] AC1 · [x] AC2 · [x] AC3 · [x] AC4 · [x] AC5 (31 tests; desktop/mobile screenshots).

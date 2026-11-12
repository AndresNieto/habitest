# HB-8 agent context

- `src/features/property-detail/`: `property-detail.tsx` (client; `canView()` visibility rule; calls `notFound()` during render), `gallery.tsx`, `visit-cta.tsx` (`visitCta()` pure decision used by both CTA slots).
- `src/domain/geo.ts`: `approxLocation(city, neighborhood)` deterministic coords + `osmEmbedUrl()`.
- Bottom nav is hidden on `/properties/*` (the page renders its own sticky CTA bar).
- HB-11 must create `/properties/[id]/visit`; the CTA already links there.

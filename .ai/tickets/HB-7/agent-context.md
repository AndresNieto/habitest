# HB-7 agent context

- `src/features/listings/`: `filters.ts` (URL ⇄ `PropertyFilters`), `listings-view.tsx` (client, reads `useSearchParams`, wrapped in `<Suspense>` by `app/page.tsx`), `property-card.tsx` (stretched-link card + scroll-snap carousel; `cardImage()` downsizes Unsplash URLs), `type-bar.tsx`, `filters-modal.tsx`.
- Listing re-fetches on `subscribeDb` changes.
- `vitest.setup.ts` now registers Testing Library `cleanup` (no vitest globals).
- Verifying with a real browser: use a fresh Chrome profile — the production SW serves cached pages from earlier builds.

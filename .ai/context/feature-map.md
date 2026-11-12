# Feature Map

Navigation map for feature ownership. Load only when locating owners, entry points, or files. Keep it current when features are added or moved.

Status: **planned** except the base app, PWA and CI (HB-3). Feature paths are the agreed target layout (see `project-profile.md` Architecture). Update each row when its ticket lands.

| Feature | Entry point / route | Main files | Owner | Notes |
| --- | --- | --- | --- | --- |
| App shell + design system | `src/app/layout.tsx` | `src/components/ui/`, `src/components/shell/`, `tailwind` tokens | AndresNieto | HB-4 |
| PWA (manifest, SW, offline) | `src/app/manifest.ts`, `src/app/sw.ts`, `/offline` | `src/app/manifest.ts`, `src/app/sw.ts`, `src/app/serwist/[path]/route.ts` (builds SW to `/serwist/sw.js`), `src/app/serwist-provider.tsx`, `src/app/offline/page.tsx`, `public/icons/`, `next.config.ts` (`withSerwist`) | AndresNieto | HB-3, HB-14 |
| Domain + mock data | n/a | `src/domain/`, `src/data/repositories/`, `src/data/seed/` | AndresNieto | HB-5 |
| Mock session + roles | `/login` | `src/features/auth/` | AndresNieto | HB-6 |
| Listings (home, search, filters) | `/` | `src/features/listings/` | AndresNieto | HB-7 |
| Property detail | `/properties/[id]` | `src/features/listings/` | AndresNieto | HB-8 |
| Publish wizard + my properties | `/publish`, `/me/properties` | `src/features/publish/` | AndresNieto | HB-9 |
| Admin review queue | `/admin/reviews`, `/admin/reviews/[id]` | `src/features/admin-review/` | AndresNieto | HB-10 |
| Visits (schedule, my visits) | `/properties/[id]/visit`, `/me/visits` | `src/features/visits/` | AndresNieto | HB-11 |
| Broker agenda + notary | `/broker`, `/broker/visits/[id]` | `src/features/broker/` | AndresNieto | HB-12 |
| Admin finances | `/admin/finance` | `src/features/admin-finance/` | AndresNieto | HB-13 |

## Cross-Cutting Infrastructure

| Concern | Location |
| --- | --- |
| Routing | `src/app/` (App Router; `layout.tsx` and `page.tsx` exist; route groups per role come with their tickets) |
| Networking / API clients | none in MVP; `src/data/repositories/` is the seam for a future API |
| Error handling | `src/app/error.tsx`, `src/app/not-found.tsx` |
| Logging | none in MVP (console in dev only) |
| Theme / design tokens | `src/app/globals.css` (Tailwind CSS v4 `@theme`; no `tailwind.config` file) |
| Auth | mock: `src/features/auth/` (Zustand session store + RoleGuard) |
| CI | `.github/workflows/ci.yml` (format:check, lint, typecheck, test, build) |

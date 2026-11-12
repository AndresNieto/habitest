# HB-5 agent context

- Import data only via `@/data` (barrel). UI must not touch `getDb()` directly.
- Mutations go through `mutate()` which persists + notifies `subscribeDb` listeners. Bump `DB_VERSION` in `seed.ts` when the shape changes (old localStorage is discarded).
- `latency()` is 0 under `NODE_ENV=test`.
- Domain errors are `DomainError` with Spanish user-facing messages; show `error.message` in the UI.
- Seed ids: users `u-tenant-1..3`, `u-admin-1`, `u-broker-1..3`; properties `p-001..p-024`. `DEMO_USERS` in the session store matches these ids.
- Images are remote Unsplash URLs (`unsplash(id, w)` helper); uploaded images (HB-9) may be data URLs.
- `lib/format.ts`: `formatCOP`, `formatCOPShort`, `formatDate` (es-CO).

# HB-6 — Mock role-based session and route guards

Issue: [#6](https://github.com/AndresNieto/habitest/issues/6) · Branch: `feature/HB-6-mock-auth-guards` · Fast mode.

- `/login` lists every seed user grouped by role (3 tenants, 1 admin, 3 brokers), marks the current one and honors `?next=` (relative paths only).
- Session persists in `localStorage` (`habi.session`); sign out, user switching and quick role switch live in the user menu (HB-4).
- `RequireRole` guard (hydration-safe) applied via layouts: `/admin/*` Admin, `/broker/*` Broker, `/publish`, `/me/*` and `/properties/[id]/visit` Tenant.
- Guests get a "sign in" prompt with a return path; other roles get a "no access" state.
- Listing and detail stay public; the detail CTA already sends guests to login (HB-8).
- [x] AC1 · [x] AC2 · [x] AC3 · [x] AC4 (36 tests).

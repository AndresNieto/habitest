# HB-6 agent context

- Guard: `src/features/session/require-role.tsx` (`guard()` pure decision + `RequireRole`). Add a `layout.tsx` wrapping `RequireRole` for any new protected segment.
- `useHydrated()` in the session store avoids a signed-out flash during hydration.
- `safeNext()` and `HOME` (role landing pages) are exported from `src/app/login/role-picker.tsx`.
- Note: `tsconfig.json` includes `.next/dev/types`; a running `pnpm dev` with stale generated types can make `pnpm typecheck` fail locally after adding routes. `pnpm build` and CI are the source of truth.

# HB-4 agent context

- Tokens: raw values on `:root`, exposed via `@theme inline` (`bg-brand`, `text-ink-muted`, `border-line`, `shadow-card`, `rounded-lg`...). No dark mode in MVP.
- Font: `next/font/google` Inter → `--font-inter` → `--font-sans`.
- UI barrel: `@/components/ui`. `buttonClasses()` styles `<Link>` as buttons.
- Role nav source of truth: `src/components/shell/nav.ts` (`NAV[role|guest]`, `isActive`).
- Session: `useSession()` / `setSession()` via `useSyncExternalStore`, key `habi.session` in localStorage; SSR snapshot is `null`. HB-6 should build on this instead of adding a new store.
- Icons: `lucide-react`.
- Verified: format, lint, typecheck, 9 tests, build; screenshots desktop 1440 and mobile 390 against `pnpm start` (no console errors).

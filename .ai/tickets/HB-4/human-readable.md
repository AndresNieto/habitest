# HB-4 — Design system + app shell

Issue: [#4](https://github.com/AndresNieto/habitest/issues/4) · Branch: `feature/HB-4-design-system-shell` · Process: fast mode (1 PR, start/close audit only).

## Delivered
- Design tokens (color, Inter typography, radii, shadows) as CSS variables + Tailwind `@theme` (`src/app/globals.css`).
- Base components in `src/components/ui`: Button, Input, Select, Card, Badge/StatusBadge, Modal (dialog/sheet), Avatar, EmptyState, Skeleton.
- App shell (`src/components/shell`): header with logo, pill search and user menu; mobile bottom nav; role-aware links.
- Demo role session (`src/features/session/session-store.ts`) and `/login` role picker (HB-6 completes it).
- Component gallery at `/design`; "section under construction" 404 page.

## Acceptance criteria
- [x] AC1 tokens · [x] AC2 components · [x] AC3 responsive shell · [x] AC4 role navigation · [x] AC5 visible focus, AA contrast (brand #E11D48 on white 4.7:1), keyboard (native dialog, Esc closes menu).

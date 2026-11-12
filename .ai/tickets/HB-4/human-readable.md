# HB-4 — Design system + app shell

Issue: [#4](https://github.com/AndresNieto/habitest/issues/4) · Branch: `feature/HB-4-design-system-shell` · Process: modo rápido (1 PR, auditoría inicio/cierre).

## Qué se entrega
- Tokens de diseño (color, tipografía Inter, radios, sombras) en variables CSS + `@theme` de Tailwind (`src/app/globals.css`).
- Componentes base en `src/components/ui`: Button, Input, Select, Card, Badge/StatusBadge, Modal (dialog/sheet), Avatar, EmptyState, Skeleton.
- App shell (`src/components/shell`): header con logo, buscador tipo píldora y menú de usuario; bottom nav en móvil; enlaces según rol.
- Sesión demo por rol (`src/features/session/session-store.ts`) y página `/login` con selector de rol (HB-6 la completará).
- Galería en `/design`; página 404 "sección en construcción".

## Criterios
- [x] AC1 tokens · [x] AC2 componentes · [x] AC3 shell responsive · [x] AC4 navegación por rol · [x] AC5 foco visible, contraste AA (brand #E11D48 sobre blanco 4.7:1), teclado (dialog nativo, Esc en menú).

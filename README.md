# Habi

PWA para comprar y vender inmuebles con tres roles: Tenant (usuario que compra o publica inmuebles; no es arrendatario), Admin (valida inmuebles y documentos) y Broker (muestra inmuebles y agenda notaría). El MVP funciona solo con datos simulados.

Estado: base técnica completa (HB-3): Next.js + PWA + CI. La página de inicio es provisional; las funcionalidades de producto llegan en tickets posteriores.

## Requisitos previos

- [nvm](https://github.com/nvm-sh/nvm) para gestionar versiones de Node.
- Node 22: la versión exacta está en `.nvmrc` (22.14.0). Desde la raíz del repositorio ejecuta `nvm install` (si aún no la tienes) y luego `nvm use`. pnpm rechaza instalar con una versión de Node fuera del rango `>=22 <23` (`engines` en `package.json`; `engineStrict: true` en `pnpm-workspace.yaml`).
- pnpm 11: la versión está fijada en el campo `packageManager` de `package.json` (11.11.0). Actívala con `corepack enable` o instálala globalmente.

Después instala las dependencias con `pnpm install`.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `pnpm dev` | Inicia el servidor de desarrollo de Next.js (por defecto en http://localhost:3000). |
| `pnpm build` | Genera el build de producción. |
| `pnpm start` | Sirve el build de producción; ejecuta `pnpm build` antes. |
| `pnpm lint` | Ejecuta ESLint. |
| `pnpm typecheck` | Comprueba los tipos de TypeScript sin emitir archivos. |
| `pnpm format` | Da formato a los archivos con Prettier. |
| `pnpm format:check` | Comprueba el formato sin modificar archivos. |
| `pnpm test` | Ejecuta los tests una vez con Vitest. |
| `pnpm test:watch` | Ejecuta Vitest en modo watch. |

### PWA

- El service worker solo se genera y registra en el build de producción. Con `pnpm dev` no hay service worker: para probarlo usa `pnpm build && pnpm start`.
- El service worker se sirve en `/serwist/sw.js` (con `Service-Worker-Allowed: /`). Su código fuente está en `src/app/sw.ts`; la ruta que lo compila está en `src/app/serwist/[path]/route.ts`.
- La página `/offline` se guarda en caché al instalar el service worker. Si no hay conexión y la página no está en caché, el navegador muestra "Sin conexión".
- Para probar el modo sin conexión:
  1. Ejecuta `pnpm build && pnpm start` y abre http://localhost:3000.
  2. En DevTools abre Application > Service workers y confirma que el service worker está activo y controla la página.
  3. Visita `/` con el service worker ya controlando la página (recarga después de la primera carga). Una página visitada solo antes de que el service worker tome control no se guarda: si `/` está en ese caso, offline mostrará "Sin conexión".
  4. Marca "Offline" en Application > Service workers (o detén el servidor). Recarga: `/` vuelve a mostrarse desde caché y una ruta nunca visitada muestra "Sin conexión".

### CI

GitHub Actions (`.github/workflows/ci.yml`) se ejecuta en PRs hacia `development` y `feature/**`, y en push a `development`. Instala con `pnpm install --frozen-lockfile` y ejecuta `format:check`, `lint`, `typecheck`, `test` y `build`.

---

## AI operating model

Project-agnostic AI operating model. Copy it into a new repository to get shared governance, business-source rules, multi-agent collaboration rules, Git/GitHub discipline, and a ticket lifecycle (start, continue, checkpoint, finish, review, PR feedback).

### Adopt In A New Project

1. Copy `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`, and `.ai/` into the repository root.
2. Fill in `.ai/context/project-profile.md`. It is the **only** file that must be customized; every other file reads its values from there.
3. Fill in `.ai/context/business-context.md` (domain, stakeholders, sources of truth, glossary).
4. Fill in the stack-specific section of `.ai/standards/code-standards.md` and `.ai/mcp/stack-tooling.md`.
5. Fill in the `Project Board`, `Delivery And Audit`, and `Subagents` sections of the profile (or set `Project board: None`). Discover board IDs with the commands in `.ai/mcp/project-board.md`.
6. Optionally start `.ai/context/feature-map.md` once the codebase has features.
7. Delete any provider entrypoint that the project does not use (see `.ai/entrypoints.md`), including `.claude/` if Claude Code is not approved.
8. Ask a human to run the one-time repository settings command in `.ai/mcp/github.md`.
9. Commit with `docs: adopt ai operating model`.

### Delivery Flow

```text
start-ticket <ID>          branch, ticket docs, Feature Plan, draft umbrella PR, card -> Planning
  deliver-checkpoint <ID>  per checkpoint N.M (main session = orchestrator):
    dev-agent   -> execute       card -> Executing
    review      -> review
    test-agent  -> test          card -> Testing
    (fail)      -> bugfix loop   card -> BugFixing -> back to test (bounded)
    doc-agent   -> document
    checkpoint-ticket            checkpoint PR into the feature branch
  human merges the checkpoint PR
  continue-ticket <ID>     marks N.M done, picks the next checkpoint
finish-ticket <ID>         umbrella PR ready for review
human merges               deploy comment, card -> Done, ticket closed
```

Every arrow that moves the card is preceded by an iteration audit comment (`.ai/standards/audit.md`).

### Layout

```text
AGENTS.md                         root shim -> .ai/AGENTS.md
CLAUDE.md                         root shim -> .ai/AGENTS.md
.github/copilot-instructions.md   shim -> .ai/AGENTS.md
.claude/agents/                   Claude Code subagent wrappers -> .ai/agents/
.claude/skills/                   Claude Code skill wrappers -> .ai/skills/
.ai/
  AGENTS.md                       canonical entrypoint
  README.md                       human index
  entrypoints.md                  provider entrypoint rules
  workflows.md                    reusable workflows + context-budget router
  skills.md                       skill index and conventions
  subagents.md                    specialist subagents + orchestrator
  agents/                         dev-agent, test-agent, doc-agent definitions
  context/                        project profile, business context, branching, feature map
  standards/                      governance, multi-agent, audit, code, quality, git, branch, docs
  mcp/                            issue tracker, GitHub, project board, stack tooling contracts
  skills/                         lifecycle skills (incl. deliver-checkpoint orchestrator)
  tickets/_template/              paired ticket doc templates
```

### Placeholder Convention

Values written as `<angle-bracket-name>` (for example `<integration-branch>`, `<TICKET-ID>`) are resolved from `.ai/context/project-profile.md`. Agents must read the profile instead of guessing them.

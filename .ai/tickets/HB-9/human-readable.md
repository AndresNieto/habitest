# HB-9 — Publish property (wizard) and My properties

Issue: [#9](https://github.com/AndresNieto/habitest/issues/9) · Branch: `feature/HB-9-publish-wizard` · Fast mode.

- `/publish` (Tenant only): 6-step wizard — type & location → features (counters, area, stratum, amenities) → title, price & description → photos → documents → summary.
- Per-step Zod validation with Spanish messages (schema messages now localized); going back keeps everything; the draft autosaves per user in `localStorage` (`habi.publishDraft.<userId>`) and survives reloads, including the current step.
- Photos: 3–10, resized client-side to ≤1280 px JPEG data URLs (~100–200 KB), preview, reorder, set cover, delete, drag & drop. A warning shows if the draft exceeds browser storage.
- Documents: certificado de tradición, escritura, predial — file name and size are stored (not the file contents; nothing leaves the browser).
- Submit creates the property as `pending_review` and redirects to `/me/properties` with a confirmation banner.
- `/me/properties`: own properties with status badge, created date, status hint and rejection reason.
- [x] AC1 · [x] AC2 · [x] AC3 · [x] AC4 · [x] AC5 (50 tests; end-to-end run in headless Chrome with real image uploads).

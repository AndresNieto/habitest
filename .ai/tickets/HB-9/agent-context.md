# HB-9 agent context

- `src/features/publish/`: `wizard-state.ts` (form state, `validateStep`, `toDraftData`, `moveImage`, draft persistence), `steps.tsx` (one component per step; `set` accepts a patch or an updater), `publish-wizard.tsx` (`PublishWizardContainer` keys the wizard by user id; `latest` ref prevents stale updates), `image-utils.ts` (canvas downscale).
- Documents keep metadata only (`fileName`, `sizeKb`); AC3 allowed data/object URLs — chosen to stay within localStorage quota.
- `Button` gained a `dark` variant.
- Bottom nav is hidden on `/publish` (wizard has its own sticky footer).
- Rejected properties cannot be edited/re-submitted from the UI yet (`submitProperty` exists in the repo layer).

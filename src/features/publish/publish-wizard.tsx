"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createProperty } from "@/data";
import { Button } from "@/components/ui";
import { useSession } from "@/features/session/session-store";
import { cn } from "@/lib/cn";
import {
  DocumentsStep,
  FeaturesStep,
  ImagesStep,
  LocationStep,
  PricingStep,
  SummaryStep,
  type StepProps,
} from "./steps";
import {
  clearDraft,
  EMPTY_STATE,
  loadDraft,
  saveDraft,
  STEPS,
  toDraftData,
  validateStep,
  type Errors,
  type WizardState,
} from "./wizard-state";

const STEP_COMPONENTS: ((p: StepProps) => React.ReactNode)[] = [
  LocationStep,
  FeaturesStep,
  PricingStep,
  ImagesStep,
  DocumentsStep,
  SummaryStep,
];

/** Remounts per user so each user gets their own draft. */
export function PublishWizardContainer() {
  const user = useSession();
  if (!user) return null;
  return <PublishWizard key={user.id} userId={user.id} />;
}

export function PublishWizard({ userId }: { userId: string }) {
  const router = useRouter();
  const [initial] = useState(() => loadDraft(userId));
  const [step, setStep] = useState(initial?.step ?? 0);
  const [state, setState] = useState<WizardState>(
    initial?.state ?? EMPTY_STATE,
  );
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [storageFull, setStorageFull] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  // Latest values, so quick successive or async updates never use stale state.
  const latest = useRef<{ step: number; state: WizardState } | null>(null);

  useEffect(() => {
    heading.current?.focus();
  }, [step]);

  /** Updates step/state and autosaves the draft. */
  const persist = (nextStep: number, nextState: WizardState) => {
    latest.current = { step: nextStep, state: nextState };
    setStep(nextStep);
    setState(nextState);
    setStorageFull(!saveDraft(userId, { step: nextStep, state: nextState }));
  };

  const set: StepProps["set"] = (patch) => {
    const cur = latest.current ?? { step, state };
    const p = typeof patch === "function" ? patch(cur.state) : patch;
    persist(cur.step, { ...cur.state, ...p });
    setErrors((e) => {
      const next = { ...e };
      for (const k of Object.keys(p)) delete next[k];
      return next;
    });
  };

  const next = () => {
    const e = validateStep(step, state);
    setErrors(e);
    if (Object.keys(e).length) return;
    persist(Math.min(step + 1, STEPS.length - 1), state);
  };

  const submit = async () => {
    const e = validateStep(STEPS.length - 1, state);
    if (Object.keys(e).length) {
      setErrors(e);
      if (e.step) persist(Number(e.step), state);
      return;
    }
    setSubmitting(true);
    try {
      const created = await createProperty(userId, toDraftData(state), {
        submit: true,
      });
      clearDraft(userId);
      router.push(`/me/properties?created=${created.id}`);
    } catch (err) {
      setErrors({
        form:
          err instanceof Error ? err.message : "No pudimos enviar el inmueble.",
      });
      setSubmitting(false);
    }
  };

  const Current = STEP_COMPONENTS[step]!;
  const last = step === STEPS.length - 1;

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-5rem)] max-w-2xl flex-col px-4 pt-8 sm:px-6">
      <p className="text-ink-muted text-sm font-semibold">
        Paso {step + 1} de {STEPS.length}
      </p>
      <div className="mt-2 flex gap-1.5" aria-hidden>
        {STEPS.map((s, i) => (
          <span
            key={s.key}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              i <= step ? "bg-ink" : "bg-line",
            )}
          />
        ))}
      </div>
      <h1
        ref={heading}
        tabIndex={-1}
        className="mt-6 mb-6 text-2xl font-semibold focus:outline-none sm:text-3xl"
      >
        {STEPS[step]!.title}
      </h1>

      <div className="flex-1 pb-8">
        <Current state={state} errors={errors} set={set} />
      </div>

      {storageFull ? (
        <p className="text-warning mb-2 text-sm">
          El borrador es muy grande para guardarse en este navegador; si
          recargas podrías perder las fotos.
        </p>
      ) : null}

      <div className="border-line bg-surface sticky bottom-0 -mx-4 flex items-center justify-between border-t px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:-mx-6 sm:px-6">
        <Button
          variant="ghost"
          className="underline"
          disabled={step === 0}
          onClick={() => persist(step - 1, state)}
        >
          Atrás
        </Button>
        {last ? (
          <Button size="lg" onClick={submit} disabled={submitting}>
            {submitting ? "Enviando…" : "Enviar a revisión"}
          </Button>
        ) : (
          <Button size="lg" variant="dark" onClick={next}>
            Siguiente
          </Button>
        )}
      </div>
    </div>
  );
}

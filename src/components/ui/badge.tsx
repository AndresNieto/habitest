import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "neutral" | "success" | "warning" | "danger" | "info";

const tones: Record<BadgeTone, string> = {
  neutral: "bg-surface-muted text-ink-muted",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
  info: "bg-info-soft text-info",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export type PropertyStatus =
  "draft" | "pending_review" | "approved" | "rejected";

const statusBadge: Record<PropertyStatus, { tone: BadgeTone; label: string }> =
  {
    draft: { tone: "neutral", label: "Borrador" },
    pending_review: { tone: "warning", label: "En revisión" },
    approved: { tone: "success", label: "Aprobado" },
    rejected: { tone: "danger", label: "Rechazado" },
  };

export function StatusBadge({ status }: { status: PropertyStatus }) {
  const { tone, label } = statusBadge[status];
  return <Badge tone={tone}>{label}</Badge>;
}

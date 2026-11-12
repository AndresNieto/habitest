import type { ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
      {icon ? (
        <div className="text-ink-subtle [&_svg]:size-10">{icon}</div>
      ) : null}
      <h2 className="text-ink text-lg font-semibold">{title}</h2>
      {description ? (
        <p className="text-ink-muted max-w-sm">{description}</p>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}

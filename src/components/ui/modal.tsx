"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  /** "sheet" slides up from the bottom on mobile; "dialog" stays centered. */
  variant?: "dialog" | "sheet";
};

/**
 * Accessible modal built on the native <dialog>: focus trap, Esc to close and
 * focus restore come from the browser.
 */
export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  variant = "dialog",
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal?.();
    if (!open && dialog.open) dialog.close?.();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="modal-title"
      onClose={onClose}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className={cn(
        "bg-surface text-ink shadow-pop m-auto w-full max-w-lg p-0 backdrop:bg-black/50",
        variant === "sheet"
          ? "mb-0 max-h-[90dvh] rounded-t-xl sm:mb-auto sm:rounded-xl"
          : "max-h-[90dvh] rounded-xl",
      )}
    >
      {open ? (
        <div className="flex max-h-[90dvh] flex-col">
          <header className="border-line relative flex items-center justify-center border-b px-12 py-4">
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="hover:bg-surface-muted absolute left-3 rounded-full p-2"
            >
              <X className="size-4" aria-hidden />
            </button>
            <h2 id="modal-title" className="text-base font-semibold">
              {title}
            </h2>
          </header>
          <div className="overflow-y-auto p-6">{children}</div>
          {footer ? (
            <footer className="border-line flex justify-end gap-3 border-t px-6 py-4">
              {footer}
            </footer>
          ) : null}
        </div>
      ) : null}
    </dialog>
  );
}

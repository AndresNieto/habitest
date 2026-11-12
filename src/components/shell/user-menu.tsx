"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LogOut, Menu, RotateCcw, UserRound } from "lucide-react";
import { resetDb } from "@/data";
import { Avatar } from "@/components/ui";
import { NAV } from "./nav";
import {
  DEMO_USERS,
  ROLE_LABEL,
  setSession,
  useSession,
  type Role,
} from "@/features/session/session-store";

const item =
  "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-ink hover:bg-surface-muted focus-visible:bg-surface-muted";

export function UserMenu() {
  const user = useSession();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);
  const links = NAV[user?.role ?? "guest"].filter((l) => l.href !== "/");

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Menú de usuario"
        onClick={() => setOpen((o) => !o)}
        className="border-line hover:shadow-pill flex items-center gap-3 rounded-full border py-1.5 pr-1.5 pl-3.5 transition-shadow"
      >
        <Menu className="size-4" aria-hidden />
        {user ? (
          <Avatar name={user.name} size="sm" />
        ) : (
          <span className="bg-ink-subtle flex size-8 items-center justify-center rounded-full text-white">
            <UserRound className="size-5" aria-hidden />
          </span>
        )}
      </button>

      {open ? (
        <div
          role="menu"
          className="border-line bg-surface shadow-pop absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-md border py-2"
        >
          {user ? (
            <p className="px-4 pt-1 pb-2 text-sm">
              <span className="block font-semibold">{user.name}</span>
              <span className="text-ink-subtle">{ROLE_LABEL[user.role]}</span>
            </p>
          ) : null}
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              role="menuitem"
              onClick={close}
              className={item}
            >
              <l.icon className="size-4" aria-hidden />
              {l.label}
            </Link>
          ))}
          <div className="border-line my-2 border-t" />
          <p className="text-ink-subtle px-4 pb-1 text-xs font-semibold tracking-wide uppercase">
            Demo: entrar como
          </p>
          {(Object.keys(DEMO_USERS) as Role[]).map((role) => (
            <button
              key={role}
              type="button"
              role="menuitemradio"
              aria-checked={user?.role === role}
              onClick={() => {
                setSession(DEMO_USERS[role]);
                close();
              }}
              className={item}
            >
              <span
                aria-hidden
                className={`size-2 rounded-full ${user?.role === role ? "bg-brand" : "bg-line"}`}
              />
              {ROLE_LABEL[role]}
            </button>
          ))}
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              resetDb();
              close();
              window.location.reload();
            }}
            className={item}
          >
            <RotateCcw className="size-4" aria-hidden />
            Restablecer datos demo
          </button>
          {user ? (
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setSession(null);
                close();
              }}
              className={item}
            >
              <LogOut className="size-4" aria-hidden />
              Cerrar sesión
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

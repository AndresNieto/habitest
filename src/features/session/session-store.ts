"use client";

import { useSyncExternalStore } from "react";

export type Role = "tenant" | "admin" | "broker";

export type SessionUser = { id: string; name: string; role: Role };

const KEY = "habi.session";
const listeners = new Set<() => void>();
let cache: SessionUser | null | undefined;

function read(): SessionUser | null {
  if (cache !== undefined) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    cache = raw ? (JSON.parse(raw) as SessionUser) : null;
  } catch {
    cache = null;
  }
  return cache;
}

export function setSession(user: SessionUser | null) {
  cache = user;
  try {
    if (user) window.localStorage.setItem(KEY, JSON.stringify(user));
    else window.localStorage.removeItem(KEY);
  } catch {
    // Storage unavailable (private mode): keep the in-memory session only.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = undefined;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Current mock session; `null` for guests (and during SSR). */
export function useSession(): SessionUser | null {
  return useSyncExternalStore(subscribe, read, () => null);
}

/** Demo users used by the role switcher until mock auth (HB-6) lands. */
export const DEMO_USERS: Record<Role, SessionUser> = {
  tenant: { id: "u-tenant-1", name: "Laura Gómez", role: "tenant" },
  admin: { id: "u-admin-1", name: "Andrés Admin", role: "admin" },
  broker: { id: "u-broker-1", name: "Camilo Rojas", role: "broker" },
};

export const ROLE_LABEL: Record<Role, string> = {
  tenant: "Tenant",
  admin: "Admin",
  broker: "Broker",
};

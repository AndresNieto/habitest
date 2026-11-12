import { createSeed, DB_VERSION, type Db } from "./seed";

const KEY = "habi.db";
let db: Db | null = null;
const listeners = new Set<() => void>();

function storage(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

/** Loads the mock DB from localStorage, seeding it on first use. */
export function getDb(): Db {
  if (db) return db;
  const raw = storage()?.getItem(KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as Db;
      if (parsed.version === DB_VERSION) return (db = parsed);
    } catch {
      // Corrupt data: fall through to a fresh seed.
    }
  }
  db = createSeed();
  persist();
  return db;
}

function persist() {
  try {
    storage()?.setItem(KEY, JSON.stringify(db));
  } catch {
    // Quota exceeded or storage disabled: keep working in memory.
  }
}

/** Applies a mutation, persists it and notifies subscribers. */
export function mutate<T>(fn: (db: Db) => T): T {
  const result = fn(getDb());
  persist();
  listeners.forEach((l) => l());
  return result;
}

export function subscribeDb(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Restores the original seed (demo reset). */
export function resetDb() {
  db = createSeed();
  persist();
  listeners.forEach((l) => l());
}

/** Simulated network latency; zero under test. */
export function latency(ms = 250) {
  const wait = process.env.NODE_ENV === "test" ? 0 : ms;
  return new Promise<void>((r) => setTimeout(r, wait));
}

export const clone = <T>(v: T): T => structuredClone(v);

export function newId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

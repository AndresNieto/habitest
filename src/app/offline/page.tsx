import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sin conexión | Habi",
};

export default function OfflinePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Sin conexión</h1>
      <p className="max-w-md text-neutral-600">
        No pudimos conectarnos a internet. Revisa tu conexión e inténtalo de
        nuevo.
      </p>
      <Link
        href="/"
        className="rounded-md bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
      >
        Reintentar
      </Link>
    </main>
  );
}

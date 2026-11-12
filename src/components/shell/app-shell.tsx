import type { ReactNode } from "react";
import { BottomNav } from "./bottom-nav";
import { Header } from "./header";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="bg-ink sr-only z-50 rounded-sm px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="main" className="flex-1 pb-24 md:pb-0">
        {children}
      </main>
      <BottomNav />
    </>
  );
}

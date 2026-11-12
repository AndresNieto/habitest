"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { cn } from "@/lib/cn";
import { useSession } from "@/features/session/session-store";
import { Logo } from "./logo";
import { isActive, NAV } from "./nav";
import { SearchPill } from "./search-pill";
import { UserMenu } from "./user-menu";

export function Header() {
  const pathname = usePathname();
  const user = useSession();
  const roleLinks = NAV[user?.role ?? "guest"].filter(
    (l) => l.href !== "/" && l.href !== "/login",
  );

  return (
    <header className="border-line bg-surface/95 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-10">
        <div className="hidden md:block">
          <Logo />
        </div>
        <Suspense fallback={<div className="h-12 flex-1" />}>
          <SearchPill className="flex-1 md:mx-auto md:max-w-md" />
        </Suspense>
        <nav
          aria-label="Secciones"
          className="hidden items-center gap-1 lg:flex"
        >
          {roleLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(pathname, l.href) ? "page" : undefined}
              className={cn(
                "hover:bg-surface-muted rounded-full px-3 py-2 text-sm font-medium",
                isActive(pathname, l.href) ? "text-ink" : "text-ink-muted",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <UserMenu />
      </div>
    </header>
  );
}

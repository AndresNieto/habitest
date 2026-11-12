"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { useSession } from "@/features/session/session-store";
import { isActive, NAV } from "./nav";

export function BottomNav() {
  const pathname = usePathname();
  const user = useSession();
  const items = NAV[user?.role ?? "guest"];
  // Property pages and the publish wizard render their own sticky action bar.
  if (pathname.startsWith("/properties/") || pathname.startsWith("/publish"))
    return null;

  return (
    <nav
      aria-label="Navegación principal"
      className="border-line bg-surface fixed inset-x-0 bottom-0 z-40 border-t pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="flex justify-around">
        {items.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium",
                  active ? "text-brand" : "text-ink-subtle",
                )}
              >
                <Icon
                  className="size-6"
                  strokeWidth={active ? 2.5 : 2}
                  aria-hidden
                />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

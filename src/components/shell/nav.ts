import {
  CalendarDays,
  ClipboardCheck,
  Home,
  type LucideIcon,
  PlusSquare,
  Search,
  UserRound,
  Wallet,
} from "lucide-react";
import type { Role } from "@/features/session/session-store";

export type NavItem = { href: string; label: string; icon: LucideIcon };

const explore: NavItem = { href: "/", label: "Explorar", icon: Search };

/** Navigation per active role; `guest` is the signed-out state. */
export const NAV: Record<Role | "guest", NavItem[]> = {
  guest: [explore, { href: "/login", label: "Ingresar", icon: UserRound }],
  tenant: [
    explore,
    { href: "/publish", label: "Publicar", icon: PlusSquare },
    { href: "/me/properties", label: "Mis inmuebles", icon: Home },
    { href: "/me/visits", label: "Visitas", icon: CalendarDays },
  ],
  admin: [
    explore,
    { href: "/admin/reviews", label: "Revisiones", icon: ClipboardCheck },
    { href: "/admin/finance", label: "Finanzas", icon: Wallet },
  ],
  broker: [explore, { href: "/broker", label: "Agenda", icon: CalendarDays }],
};

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

import type { ReactNode } from "react";
import { RequireRole } from "@/features/session/require-role";

export default function Layout({ children }: { children: ReactNode }) {
  return <RequireRole role="tenant">{children}</RequireRole>;
}

import type { Metadata } from "next";
import { RolePicker } from "./role-picker";

export const metadata: Metadata = { title: "Ingresar" };

export default function LoginPage() {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold">Ingresa a Habi</h1>
      <p className="text-ink-muted mt-2">
        Versión demo: elige con qué rol quieres entrar.
      </p>
      <RolePicker />
    </div>
  );
}

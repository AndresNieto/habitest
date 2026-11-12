import type { Metadata } from "next";
import { Suspense } from "react";
import { MyProperties } from "@/features/my-properties/my-properties";

export const metadata: Metadata = { title: "Mis inmuebles" };

export default function MyPropertiesPage() {
  return (
    <Suspense>
      <MyProperties />
    </Suspense>
  );
}

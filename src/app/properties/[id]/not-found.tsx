import Link from "next/link";
import { HousePlus } from "lucide-react";
import { buttonClasses, EmptyState } from "@/components/ui";

export default function PropertyNotFound() {
  return (
    <EmptyState
      icon={<HousePlus />}
      title="Este inmueble no está disponible"
      description="Puede que ya no esté publicado o que aún esté en revisión."
      action={
        <Link href="/" className={buttonClasses("primary")}>
          Ver inmuebles
        </Link>
      }
    />
  );
}

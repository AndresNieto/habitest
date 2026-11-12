import Link from "next/link";
import { Construction } from "lucide-react";
import { buttonClasses, EmptyState } from "@/components/ui";

export default function NotFound() {
  return (
    <EmptyState
      icon={<Construction />}
      title="Esta sección aún no está disponible"
      description="Estamos construyéndola. Mientras tanto, explora los inmuebles disponibles."
      action={
        <Link href="/" className={buttonClasses("primary")}>
          Ver inmuebles
        </Link>
      }
    />
  );
}

import type { Metadata } from "next";
import { PublishWizardContainer } from "@/features/publish/publish-wizard";

export const metadata: Metadata = { title: "Publicar inmueble" };

export default function PublishPage() {
  return <PublishWizardContainer />;
}

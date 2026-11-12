import type { Metadata } from "next";
import { DesignGallery } from "./gallery";

export const metadata: Metadata = { title: "Sistema de diseño" };

export default function DesignPage() {
  return <DesignGallery />;
}

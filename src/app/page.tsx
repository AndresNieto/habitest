import { Suspense } from "react";
import { ListingsView } from "@/features/listings/listings-view";

export default function Home() {
  return (
    <Suspense>
      <ListingsView />
    </Suspense>
  );
}

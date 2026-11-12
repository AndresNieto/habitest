import { createSerwistRoute } from "@serwist/turbopack";
import { randomUUID } from "node:crypto";

// Revision for precached pages that are not part of the build output.
const revision = randomUUID();

export const { dynamic, dynamicParams, revalidate, generateStaticParams, GET } =
  createSerwistRoute({
    additionalPrecacheEntries: [{ url: "/offline", revision }],
    swSrc: "src/app/sw.ts",
    useNativeEsbuild: true,
  });

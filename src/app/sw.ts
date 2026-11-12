/// <reference lib="webworker" />
import { defaultCache } from "@serwist/turbopack/worker";
import { type PrecacheEntry, Serwist } from "serwist";

declare global {
  interface WorkerGlobalScope {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

// Not using the `fallbacks` option: it only attaches to runtimeCaching handlers
// that are `instanceof` this `serwist` copy's Strategy, but `defaultCache` comes
// from @serwist/turbopack, which resolves a separate serwist instance (pnpm peer
// variation), so the check fails and no fallback is ever applied.
serwist.setCatchHandler(async ({ request }) => {
  if (request.destination === "document") {
    const offline = await serwist.matchPrecache("/offline");
    if (offline) return offline;
  }
  return Response.error();
});

serwist.addEventListeners();

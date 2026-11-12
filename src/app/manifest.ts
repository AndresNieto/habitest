import type { MetadataRoute } from "next";

// Placeholder palette; HB-4 finalizes design tokens.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Habi",
    short_name: "Habi",
    description: "Habi: plataforma para comprar y vender inmuebles.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    lang: "es",
    background_color: "#ffffff",
    theme_color: "#E11D48",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

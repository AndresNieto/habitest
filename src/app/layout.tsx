import type { Metadata, Viewport } from "next";
import { PwaProvider } from "./serwist-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Habi",
  description: "Habi: plataforma para comprar y vender inmuebles.",
  applicationName: "Habi",
  icons: {
    icon: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "Habi",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#E11D48",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <PwaProvider>{children}</PwaProvider>
      </body>
    </html>
  );
}

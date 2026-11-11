import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MotionProvider from "@/components/MotionProvider";
import AssetBoot from "@/components/AssetBoot";
import { LanguageProvider } from "@/lib/i18n";
import { getBootAssets } from "@/lib/boot-assets";

export const metadata: Metadata = {
  title: "Favio Asturimac — Full Stack Developer",
  description: "Portfolio personal de Favio Asturimac, Full Stack Developer especializado en cloud, data engineering e IA.",
  openGraph: {
    title: "Favio Asturimac — Full Stack Developer",
    description: "Portfolio personal de Favio Asturimac, Full Stack Developer especializado en cloud, data engineering e IA.",
    type: "website",
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Favio Asturimac — Full Stack Developer",
    description: "Portfolio personal de Favio Asturimac, Full Stack Developer.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { localFont } from "next/font/local";

const inter = localFont({
  src: [
    {
      path: "../../assets/fonts/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const spaceGrotesk = localFont({
  src: [
    { path: "../../assets/fonts/SpaceGrotesk-400.woff2", weight: "400", style: "normal" },
    { path: "../../assets/fonts/SpaceGrotesk-500.woff2", weight: "500", style: "normal" },
    { path: "../../assets/fonts/SpaceGrotesk-600.woff2", weight: "600", style: "normal" },
    { path: "../../assets/fonts/SpaceGrotesk-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-heading",
  display: "swap",
  preload: true,
});

const ibmPlexMono = localFont({
  src: [
    { path: "../../assets/fonts/IBMPlexMono-400.woff2", weight: "400", style: "normal" },
    { path: "../../assets/fonts/IBMPlexMono-500.woff2", weight: "500", style: "normal" },
    { path: "../../assets/fonts/IBMPlexMono-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
  preload: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="es" className={`${inter.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable}`}>
      <body className="min-h-full flex flex-col antialiased">
        <MotionProvider>
          <LanguageProvider>
            <AssetBoot assets={getBootAssets().filter((asset) => asset.group === "hero")}>
            <Navbar />
            <div className="flex-1">{children}</div>
            </AssetBoot>
          </LanguageProvider>
        </MotionProvider>
      </body>
    </html>
  );
}

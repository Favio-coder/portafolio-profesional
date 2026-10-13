import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MotionProvider from "@/components/MotionProvider";
import AssetBoot from "@/components/AssetBoot";
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

import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
  preload: true,
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
          <AssetBoot assets={getBootAssets().filter((asset) => asset.group === "hero")}>
          <Navbar />
          <div className="flex-1">{children}</div>
          </AssetBoot>
        </MotionProvider>
      </body>
    </html>
  );
}

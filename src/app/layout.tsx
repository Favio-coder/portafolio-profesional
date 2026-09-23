import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Favio Asturimac — Full Stack Developer",
  description: "Portfolio personal de Favio Asturimac, Full Stack Developer.",
};

import { Inter, Press_Start_2P } from "next/font/google";

const pixelFont = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} ${pixelFont.variable} min-h-full flex flex-col bg-[#0a0a0a] text-[#e6e3d9]`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}

"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import Image from "next/image";
import { Globe } from "lucide-react";

const labels: Record<string, string> = { es: "ES", en: "EN" };

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [hovered, setHovered] = useState(false);
  const nextLang: string = lang === "es" ? "en" : "es";

  return (
    <button
      type="button"
      onClick={() => setLang(nextLang as "es" | "en")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={lang === "es" ? "Cambiar a inglés" : "Cambiar a español"}
      title={lang === "es" ? "Cambiar a inglés" : "Cambiar a español"}
      className="relative group flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-background text-muted-foreground hover:bg-secondary hover:text-primary-ink transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
    >
      <Globe className="size-4 shrink-0" aria-hidden="true" />
      <span
        className={`absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-[0.6rem] font-mono font-bold transition-all ${
          hovered
            ? "bg-primary text-primary-foreground scale-110"
            : "bg-muted text-muted-foreground opacity-0 group-hover:opacity-100 scale-100"
        }`}
      >
        {labels[nextLang]}
      </span>
      <span className="sr-only">{labels[lang]}</span>
    </button>
  );
}

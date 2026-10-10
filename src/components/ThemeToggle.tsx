"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

export default function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, () => document.documentElement.classList.contains("dark"), () => false);
  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem("favio-theme", next ? "dark" : "light"); } catch { /* Storage may be blocked. */ }
  }
  return <button type="button" onClick={toggle} aria-label="Modo oscuro" aria-pressed={dark} title="Cambiar tema"
    className="inline-flex size-11 shrink-0 items-center justify-center border border-border bg-muted text-foreground hover:bg-secondary">
    {dark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
  </button>;
}

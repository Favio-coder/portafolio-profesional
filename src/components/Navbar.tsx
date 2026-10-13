"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import PortfolioTerminal from "@/components/PortfolioTerminal";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Terminal, Menu, X } from "lucide-react";
import { useSectionNavigation } from "@/lib/section-navigation";

const navegacion = [
  { numero: "01", label: "SOBRE MÍ", href: "#about", id: "about", isAnchor: true },
  { numero: "02", label: "EXPERIENCIA", href: "#experience", id: "experience", isAnchor: true },
  { numero: "03", label: "PROYECTOS", href: "#projects", id: "projects", isAnchor: true },
  { numero: "04", label: "CUADERNO", href: "/cuaderno", isAnchor: false },
  { numero: "05", label: "GALERÍA", href: "#gallery", id: "gallery", isAnchor: true },
  { numero: "06", label: "CONTACTO", href: "#contact", id: "contact", isAnchor: true },
];

export default function Navbar() {

  const { navigateToSection } = useSectionNavigation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  const navRef = useRef<HTMLElement>(null);

  const navigateFromMenu = () => {
    setMenuOpen(false);
    navRef.current?.querySelector<HTMLButtonElement>('button[aria-expanded]')?.focus({ preventScroll: true });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    const nav = navRef.current?.querySelector("nav");
    const observer = new ResizeObserver(() => {
      if (nav) document.documentElement.style.setProperty("--nav-height", `${nav.offsetHeight}px`);
    });
    if (nav) observer.observe(nav);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", handleScroll); };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);

        navRef.current?.querySelector<HTMLButtonElement>('[aria-expanded="true"]')?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md transition-all duration-300 ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <nav className="mx-auto flex w-full max-w-350 items-center justify-between px-6 py-4 md:px-8 lg:px-12">
          <Link
            href="/"
            className="font-heading font-black text-xl tracking-tight text-foreground"
            aria-label="Favio Asturimac - Inicio"
          >
            FAVIO.DEV
          </Link>

          <div className="hidden items-center gap-5 xl:flex">
            {navegacion.map((item) => (
              <Link
                href={item.href}
                key={item.numero}
                onClick={(event) => item.isAnchor && navigateToSection(event, item.id!)}
                className="group relative font-mono text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="flex items-center gap-2">
                  <span className="text-primary">{item.numero}</span>
                  <span>{item.label}</span>
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-px w-0 bg-primary"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setTerminalOpen(true)}
              className="group hidden xl:inline-flex items-center gap-2 px-4 py-2 font-mono text-sm uppercase tracking-wider text-foreground bg-muted border border-border rounded-sm hover:bg-secondary hover:border-primary transition-all"
            >
              <Terminal className="size-4" aria-hidden="true" />
              <span>TERMINAL</span>
            </button>

            <button
              type="button"
              className="xl:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X className="size-6 text-foreground" aria-hidden="true" />
              ) : (
                <Menu className="size-6 text-foreground" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-border bg-background px-6 py-4 xl:hidden"
            >
              <div className="space-y-1">
                {navegacion.map((item) => (
                  <Link
                    href={item.href}
                    key={item.numero}
                    onClick={(event) => item.isAnchor && navigateToSection(event, item.id!, navigateFromMenu)}
                    className="flex items-center gap-3 py-3 font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="text-primary-ink">{item.numero}</span>
                    <span className="text-border">/</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => { setMenuOpen(false); setTerminalOpen(true); }}
                  className="w-full flex items-center gap-3 py-3 font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="text-primary-ink">07</span>
                  <span className="text-border">/</span>
                  <span>TERMINAL</span>
                </button>
              </div>
              <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  SYSTEM ONLINE
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <PortfolioTerminal open={terminalOpen} onOpenChange={setTerminalOpen} />
    </>
  );
}



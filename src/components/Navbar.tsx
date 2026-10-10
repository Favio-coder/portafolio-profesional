"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Terminal, Menu, X } from "lucide-react";
import { navigateToSection, scrollToSection } from "@/lib/section-navigation";

const navegacion = [
  { numero: "01", label: "SOBRE MÍ", id: "about" },
  { numero: "02", label: "EXPERIENCIA", id: "experience" },
  { numero: "03", label: "PROYECTOS", id: "projects" },
  { numero: "04", label: "GALERÍA", id: "gallery" },
  { numero: "05", label: "CONTACTO", id: "contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
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
    if (terminalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [terminalOpen]);

  useEffect(() => {
    if (!menuOpen && !terminalOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setTerminalOpen(false);
        navRef.current?.querySelector<HTMLButtonElement>('[aria-expanded="true"]')?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen, terminalOpen]);


  const ejecutarComando = () => {
    const comando = terminalInput.trim().toLowerCase();

    if (!comando) return;

    if (comando === "help") {
      setTerminalOutput((prev) => [
        ...prev,
        `favio@portfolio:~$ ${terminalInput}`,
        "",
        "COMANDOS DISPONIBLES",
        "",
        "help       → Mostrar comandos",
        "about      → Sobre mí",
        "experience → Experiencia",
        "projects   → Proyectos",
        "gallery    → Galería",
        "contact    → Contacto",
        "whoami     → Info personal",
        "clear      → Limpiar terminal",
        "",
      ]);
    } else if (comando === "whoami") {
      setTerminalOutput((prev) => [
        ...prev,
        `favio@portfolio:~$ ${terminalInput}`,
        "",
        "RICHARD FAVIO ASTURIMAC MEDINA",
        "Full Stack Developer",
        "IX Ciclo - Ingeniería de Sistemas",
        "Cloud | Data | AI",
        "",
      ]);
    } else if (comando === "about") {
      setTerminalOutput((prev) => [
        ...prev,
        `favio@portfolio:~$ ${terminalInput}`,
        "",
        "Navegando a about...",
        "",
      ]);
      setMenuOpen(false);
      setTerminalOpen(false);
      scrollToSection("about");
    } else if (comando === "experience") {
      setTerminalOutput((prev) => [
        ...prev,
        `favio@portfolio:~$ ${terminalInput}`,
        "",
        "Navegando a experience...",
        "",
      ]);
      setMenuOpen(false);
      setTerminalOpen(false);
      scrollToSection("experience");
    } else if (comando === "projects") {
      setTerminalOutput((prev) => [
        ...prev,
        `favio@portfolio:~$ ${terminalInput}`,
        "",
        "Navegando a projects...",
        "",
      ]);
      setMenuOpen(false);
      setTerminalOpen(false);
      scrollToSection("projects");
    } else if (comando === "gallery") {
      setTerminalOutput((prev) => [
        ...prev,
        `favio@portfolio:~$ ${terminalInput}`,
        "",
        "Navegando a gallery...",
        "",
      ]);
      setMenuOpen(false);
      setTerminalOpen(false);
      scrollToSection("gallery");
    } else if (comando === "contact") {
      setTerminalOutput((prev) => [
        ...prev,
        `favio@portfolio:~$ ${terminalInput}`,
        "",
        "Navegando a contact...",
        "",
      ]);
      setMenuOpen(false);
      setTerminalOpen(false);
      scrollToSection("contact");
    } else if (comando === "clear") {
      setTerminalOutput([]);
    } else {
      setTerminalOutput((prev) => [
        ...prev,
        `favio@portfolio:~$ ${terminalInput}`,
        `command not found: ${comando}`,
        `Escribe "help" para ver comandos.`,
      ]);
    }

    setTerminalInput("");
  };

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
              <a
                href={`#${item.id}`}
                key={item.numero}
                onClick={(event) => navigateToSection(event, item.id)}
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
              </a>
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
                  <a
                    href={`#${item.id}`}
                    key={item.numero}
                    onClick={(event) => navigateToSection(event, item.id, navigateFromMenu)}
                    className="flex items-center gap-3 py-3 font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="text-primary-ink">{item.numero}</span>
                    <span className="text-border">/</span>
                    <span>{item.label}</span>
                  </a>
                ))}
                <button
                  type="button"
                  onClick={() => { setMenuOpen(false); setTerminalOpen(true); }}
                  className="w-full flex items-center gap-3 py-3 font-mono text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="text-primary-ink">06</span>
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

      <AnimatePresence>
        {terminalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-background/90 backdrop-blur-sm px-4"
            onClick={() => setTerminalOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Terminal FAVIO.DEV"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-[75vh] w-full max-w-4xl flex-col overflow-hidden border border-border bg-card shadow-2xl"
            >
              <div className="flex h-11 shrink-0 items-center justify-between border-b border-border bg-muted px-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setTerminalOpen(false)}
                    aria-label="Cerrar terminal"
                    className="group flex h-3 w-3 items-center justify-center rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                  >
                    <span className="text-[8px] leading-none text-white/0 group-hover:text-white/70">×</span>
                  </button>
                  <button
                    type="button"
                    aria-label="Minimizar terminal"
                    className="group flex h-3 w-3 items-center justify-center rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors"
                  >
                    <span className="h-px w-1.5 bg-white/0 group-hover:bg-white/70" />
                  </button>
                  <button
                    type="button"
                    aria-label="Maximizar terminal"
                    className="group flex h-3 w-3 items-center justify-center rounded-full bg-green-500/80 hover:bg-green-500 transition-colors"
                  >
                    <span className="text-[7px] leading-none text-white/0 group-hover:text-white/70">+</span>
                  </button>
                </div>
                <div className="pointer-events-none absolute left-1/2 -translate-x-1/2">
                  <span className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
                    FAVIO TERMINAL v0.1
                  </span>
                </div>
                <div className="w-12" />
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="font-mono text-sm leading-relaxed">
                  <p className="text-muted-foreground">
                    FAVIO ASTURIMAC — PORTFOLIO TERMINAL
                  </p>
                  <p className="mt-2 text-primary-ink">System online.</p>
                  <p className="mt-1 text-foreground">
                    Type <span className="font-bold">help</span> to see available commands.
                  </p>

                  <div className="mt-6 whitespace-pre-wrap font-mono text-sm">
                    {terminalOutput.map((line, index) => (
                      <div
                        key={index}
                        className={
                          line.includes("COMANDOS DISPONIBLES")
                            ? "text-primary-ink"
                            : line.includes("command not found")
                            ? "text-red-400"
                            : "text-muted-foreground"
                        }
                      >
                        {line || "\u00A0"}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center">
                    <span className="shrink-0 font-mono text-sm">
                      <span className="text-primary-ink">favio@portfolio</span>
                      <span className="text-muted-foreground">:</span>
                      <span className="text-sky-500">~</span>
                      <span className="text-muted-foreground">$</span>
                    </span>
                    <input
                      autoFocus
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          ejecutarComando();
                        }
                      }}
                      className="ml-3 w-full bg-transparent text-foreground outline-none caret-primary font-mono text-sm"
                      spellCheck={false}
                      autoComplete="off"
                      placeholder="Escribe un comando..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex h-8 shrink-0 items-center justify-between border-t border-border bg-muted px-4">
                <span className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
                  TERMINAL
                </span>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
                    ONLINE
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

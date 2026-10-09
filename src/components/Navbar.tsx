"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Terminal } from "lucide-react";

const navegacion = [
  { numero: "01", label: "SOBRE MÍ", href: "#about" },
  { numero: "02", label: "EXPERIENCIA", href: "#experience" },
  { numero: "03", label: "PROYECTOS", href: "#projects" },
  { numero: "04", label: "GALERÍA", href: "#gallery" },
  { numero: "05", label: "CONTACTO", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (terminalOpen || menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [terminalOpen, menuOpen]);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

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
        "Navegando a #about...",
        "",
      ]);
      setMenuOpen(false);
      setTerminalOpen(false);
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    } else if (comando === "experience") {
      setTerminalOutput((prev) => [
        ...prev,
        `favio@portfolio:~$ ${terminalInput}`,
        "",
        "Navegando a #experience...",
        "",
      ]);
      setMenuOpen(false);
      setTerminalOpen(false);
      document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
    } else if (comando === "projects") {
      setTerminalOutput((prev) => [
        ...prev,
        `favio@portfolio:~$ ${terminalInput}`,
        "",
        "Navegando a #projects...",
        "",
      ]);
      setMenuOpen(false);
      setTerminalOpen(false);
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    } else if (comando === "gallery") {
      setTerminalOutput((prev) => [
        ...prev,
        `favio@portfolio:~$ ${terminalInput}`,
        "",
        "Navegando a #gallery...",
        "",
      ]);
      setMenuOpen(false);
      setTerminalOpen(false);
      document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
    } else if (comando === "contact") {
      setTerminalOutput((prev) => [
        ...prev,
        `favio@portfolio:~$ ${terminalInput}`,
        "",
        "Navegando a #contact...",
        "",
      ]);
      setMenuOpen(false);
      setTerminalOpen(false);
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
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
        className={`fixed top-0 left-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md transition-all duration-300 ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <nav className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-4 md:px-8 lg:px-12">
          <Link
            href="/"
            className="font-heading font-black text-xl tracking-tight text-[var(--foreground)]"
            aria-label="Favio Asturimac - Inicio"
          >
            FAVIO.DEV
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navegacion.map((item) => (
              <Link
                key={item.numero}
                href={item.href}
                onClick={handleLinkClick}
                className="group relative font-mono text-sm uppercase tracking-widest text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"
              >
                <span className="flex items-center gap-2">
                  <span className="text-[var(--primary)]">{item.numero}</span>
                  <span>{item.label}</span>
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--primary)]"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <button
              type="button"
              onClick={() => setTerminalOpen(true)}
              className="group inline-flex items-center gap-2 px-4 py-2 font-mono text-sm uppercase tracking-wider text-[var(--foreground)] bg-[var(--muted)] border border-[var(--border)] rounded-sm hover:bg-[var(--secondary)] hover:border-[var(--primary)] transition-all"
            >
              <Terminal className="size-4" aria-hidden="true" />
              <span>TERMINAL</span>
            </button>
          </div>

          <button
            className="flex flex-col items-center justify-center gap-4 md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <motion.span
              className="h-0.5 w-7 bg-[var(--foreground)] origin-center"
              animate={{
                rotate: menuOpen ? 45 : 0,
                y: menuOpen ? 5 : 0,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            <motion.span
              className="h-0.5 w-7 bg-[var(--foreground)] origin-center"
              animate={{
                opacity: menuOpen ? 0 : 1,
                rotate: menuOpen ? -45 : 0,
                y: menuOpen ? -5 : 0,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            <motion.span
              className="h-0.5 w-7 bg-[var(--foreground)] origin-center"
              animate={{
                rotate: menuOpen ? -45 : 0,
                y: menuOpen ? -5 : 0,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-[var(--border)] bg-[var(--background)] px-6 py-4 md:hidden"
            >
              <div className="space-y-1">
                {navegacion.map((item) => (
                  <Link
                    key={item.numero}
                    href={item.href}
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 py-3 font-mono text-sm uppercase tracking-widest text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                  >
                    <span className="text-[var(--primary)]">{item.numero}</span>
                    <span className="text-[var(--border)]">/</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--muted-foreground)]">
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
            className="fixed inset-0 z-100 flex items-center justify-center bg-[var(--background)]/90 backdrop-blur-sm px-4"
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
              className="relative flex h-[75vh] w-full max-w-4xl flex-col overflow-hidden border border-[var(--border)] bg-[var(--card)] shadow-2xl"
            >
              <div className="flex h-11 shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--muted)] px-4">
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
                  <span className="font-mono text-[0.625rem] uppercase tracking-widest text-[var(--muted-foreground)]">
                    FAVIO TERMINAL v0.1
                  </span>
                </div>
                <div className="w-12" />
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <div className="font-mono text-sm leading-relaxed">
                  <p className="text-[var(--muted-foreground)]">
                    FAVIO ASTURIMAC — PORTFOLIO TERMINAL
                  </p>
                  <p className="mt-2 text-[var(--primary)]">System online.</p>
                  <p className="mt-1 text-[var(--foreground)]">
                    Type <span className="font-bold">help</span> to see available commands.
                  </p>

                  <div className="mt-6 whitespace-pre-wrap font-mono text-sm">
                    {terminalOutput.map((line, index) => (
                      <div
                        key={index}
                        className={
                          line.includes("COMANDOS DISPONIBLES")
                            ? "text-[var(--primary)]"
                            : line.includes("command not found")
                            ? "text-red-400"
                            : "text-[var(--muted-foreground)]"
                        }
                      >
                        {line || "\u00A0"}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center">
                    <span className="shrink-0 font-mono text-sm">
                      <span className="text-[var(--primary)]">favio@portfolio</span>
                      <span className="text-[var(--muted-foreground)]">:</span>
                      <span className="text-sky-500">~</span>
                      <span className="text-[var(--muted-foreground)]">$</span>
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
                      className="ml-3 w-full bg-transparent text-[var(--foreground)] outline-none caret-[var(--primary)] font-mono text-sm"
                      spellCheck={false}
                      autoComplete="off"
                      placeholder="Escribe un comando..."
                    />
                  </div>
                </div>
              </div>

              <div className="flex h-8 shrink-0 items-center justify-between border-t border-[var(--border)] bg-[var(--muted)] px-4">
                <span className="font-mono text-[0.625rem] uppercase tracking-widest text-[var(--muted-foreground)]">
                  TERMINAL
                </span>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
                  <span className="font-mono text-[0.625rem] uppercase tracking-widest text-[var(--muted-foreground)]">
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
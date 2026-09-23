"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navegacion = [
  { numero: "01", label: "SOBRE MÍ", href: "#about" },
  { numero: "02", label: "PROYECTOS", href: "#projects" },
  { numero: "04", label: "GALERÍA", href: "#gallery" },
  { numero: "05", label: "CONTACTO", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Lógica de terminal
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current && isScrolled) {
      gsap.to(navRef.current, {
        backgroundColor: "rgba(10,10,10,0.95)",
        borderColor: "rgba(230,227,217,0.2)",
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isScrolled]);

  // Bloquear scroll cuando el terminal está abierto
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

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const ejecutarComando = () => {
    const comando = terminalInput.trim().toLocaleLowerCase();

    if (!comando) return;

    if (comando == "help") {
      setTerminalOutput((prev) => [
        ...prev,
        `favio@portfolio:~$ ${terminalInput}`,
        "",
        "AVAILABLE COMMANDS",
        "",
        "help       → Mostrar comandos disponibles",
        "about      → Sobre mí",
        "projects   → Mis proyectos",
        "stack      → Tecnologías",
        "gallery    → Galería",
        "contact    → Contacto",
        "whoami     → Información sobre Favio",
        "clear      → Limpiar terminal",
        "",
      ]);
    } else {
      setTerminalOutput((prev) => [
        ...prev,
        `favio@portfolio:~$ ${terminalInput}`,
        `command not found: ${comando}`,
        `Escribe "help" para ver los comandos disponibles.`
      ]);
    }

    setTerminalInput("");
  };

  return (
    <>
      {/* =========================
          NAVBAR
      ========================= */}

      <header
        ref={navRef}
        className={`fixed top-0 left-0 z-50 w-full border-b border-[#e6e3d9]/10
        bg-[#1a1a1a]/95 text-[#e6e3d9] backdrop-blur-sm
        transition-all duration-300`}
        style={{
          backgroundColor: isScrolled
            ? "rgba(10,10,10,0.95)"
            : "rgba(26,26,26,0.95)",
        }}
      >
        <nav
          className={`mx-auto flex w-full max-w-7xl items-center justify-between
          px-6 transition-all duration-300 md:px-8
          ${isScrolled ? "py-3" : "py-4"}`}
        >
          {/* LOGO */}

          <Link
            href="/"
            className="font-mono text-md font-medium tracking-tight"
          >
            <span className="text-[#e6e3d9]">Favio Asturimac</span>
          </Link>

          {/* NAVEGACIÓN */}

          <div className="hidden items-center gap-8 md:flex">
            {navegacion.map((item) => (
              <Link
                key={item.numero}
                href={item.href}
                onClick={handleLinkClick}
                className="group relative font-mono text-sm uppercase tracking-widest text-[#e6e3d9]/50 transition-colors hover:text-[#e6e3d9]"
              >
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                  {item.label}
                </span>

                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#0ce642] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* TERMINAL */}

          <div className="hidden items-center gap-4 md:flex">
            <button
              type="button"
              onClick={() => setTerminalOpen(true)}
              className="pixel-font relative rounded-sm border-2 border-[#f4f2ea]
              bg-[#f4f2ea] px-5 py-1.5 font-mono text-[11px]
              font-bold uppercase tracking-[0.15em] text-[#0a0a0a]
              shadow-[0_4px_0_#555] transition-all duration-150
              hover:bg-white hover:translate-y-px hover:shadow-[0_2px_0_#555]
              active:translate-y-1 active:shadow-none"
            >
              TERMINAL
            </button>
          </div>

          {/* MOBILE MENU */}

          <button
            className="flex flex-col items-center justify-center gap-1.5 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`h-0.5 w-6 bg-[#e6e3d9] transition-all duration-300 ${
                menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />

            <span
              className={`h-0.5 w-6 bg-[#e6e3d9] transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />

            <span
              className={`h-0.5 w-6 bg-[#e6e3d9] transition-all duration-300 ${
                menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </nav>

        {/* MOBILE NAV */}

        <div
          className={`overflow-hidden transition-all duration-500 md:hidden ${
            menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-[#e6e3d9]/10 bg-[#0a0a0a] px-6 py-4">
            {navegacion.map((item) => (
              <Link
                key={item.numero}
                href={item.href}
                onClick={handleLinkClick}
                className="flex items-center gap-3 py-3 font-mono text-[11px]
                uppercase tracking-widest text-[#e6e3d9]/60
                transition-colors hover:pl-2 hover:text-[#e6e3d9]"
              >
                <span className="text-[#e6e3d9]/20">{item.numero}</span>
                <span className="text-[#e6e3d9]/30">/</span>
                <span>{item.label}</span>
              </Link>
            ))}

            <div className="mt-4 flex items-center gap-3 border-t border-[#e6e3d9]/10 pt-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0ce642]" />

              <span className="font-mono text-[9px] uppercase tracking-wider text-[#e6e3d9]/40">
                SYSTEM ONLINE
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* =========================
          TERMINAL OVERLAY
      ========================= */}

      {terminalOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center
          bg-black/80 px-4 backdrop-blur-sm"
          onClick={() => setTerminalOpen(false)}
        >
          {/* =========================
              TERMINAL WINDOW
          ========================= */}

          <div
            className="relative flex h-[70vh] w-full max-w-4xl flex-col
            overflow-hidden border border-[#e6e3d9]/15
            bg-[#0c0c0c] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* TERMINAL HEADER */}

            <div
              className="flex h-11 shrink-0 items-center
              border-b border-[#e6e3d9]/10 bg-[#151515] px-4"
            >
              {/* MAC / LINUX BUTTONS */}

              <div className="flex items-center gap-2">
                {/* CERRAR */}

                <button
                  type="button"
                  onClick={() => setTerminalOpen(false)}
                  aria-label="Cerrar terminal"
                  className="group flex h-3 w-3 items-center justify-center
                  rounded-full bg-[#ff5f57]"
                >
                  <span className="text-[8px] leading-none text-black opacity-0 group-hover:opacity-70">
                    ×
                  </span>
                </button>

                {/* MINIMIZAR */}

                <button
                  type="button"
                  aria-label="Minimizar terminal"
                  className="group flex h-3 w-3 items-center justify-center
                  rounded-full bg-[#febc2e]"
                >
                  <span className="h-px w-1.5 bg-black opacity-0 group-hover:opacity-70" />
                </button>

                {/* AGRANDAR */}

                <button
                  type="button"
                  aria-label="Agrandar terminal"
                  className="group flex h-3 w-3 items-center justify-center
                  rounded-full bg-[#28c840]"
                >
                  <span className="text-[7px] leading-none text-black opacity-0 group-hover:opacity-70">
                    +
                  </span>
                </button>
              </div>

              {/* TITLE */}

              <div className="pointer-events-none absolute left-1/2 -translate-x-1/2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#e6e3d9]/35">
                  FAVIO TERMINAL
                </span>
              </div>
            </div>

            {/* TERMINAL BODY */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="font-mono text-sm leading-relaxed">
                <p className="text-[#e6e3d9]/40">
                  FAVIO OS — PORTFOLIO TERMINAL
                </p>

                <p className="mt-2 text-[#0ce642]">System online.</p>

                <p className="mt-1 text-[#e6e3d9]/30">
                  Type "help" to see available commands.
                </p>

                {/* OUTPUT */}

                <div className="mt-6 whitespace-pre-wrap">
                  {terminalOutput.map((line, index) => (
                    <div
                      key={index}
                      className={
                        line.includes("AVAILABLE COMMANDS")
                          ? "text-[#0ce642]"
                          : line.includes("command not found")
                            ? "text-red-400"
                            : "text-[#e6e3d9]/70"
                      }
                    >
                      {line || "\u00A0"}
                    </div>
                  ))}
                </div>

                {/* INPUT */}

                <div className="mt-2 flex items-center">
                  <span className="shrink-0">
                    <span className="text-[#0ce642]">favio@portfolio</span>

                    <span className="text-[#e6e3d9]/30">:</span>

                    <span className="text-[#4da6ff]">~</span>

                    <span className="text-[#e6e3d9]/50">$</span>
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
                    className="ml-2 w-full bg-transparent text-[#e6e3d9]
        outline-none caret-[#0ce642]"
                    spellCheck={false}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>

            {/* STATUS BAR */}

            <div
              className="flex h-7 shrink-0 items-center justify-between
              border-t border-[#e6e3d9]/10 bg-[#111]
              px-4"
            >
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#e6e3d9]/25">
                TERMINAL
              </span>

              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0ce642]" />

                <span className="font-mono text-[9px] uppercase tracking-widest text-[#e6e3d9]/25">
                  ONLINE - v0.1
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

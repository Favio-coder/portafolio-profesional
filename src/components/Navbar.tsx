"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navegacion = [
  { numero: "01", label: "SOBRE MÍ", href: "#about" },
  { numero: "02", label: "PROYECTOS", href: "#projects" },
  { numero: "03", label: "GALERÍA", href: "#gallery" },
  { numero: "04", label: "CONTACTO", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full border-b border-[#e6e3d9]/10 bg-[#0a0a0a] text-[#e6e3d9] transition-all duration-300 ${
        isScrolled ? "border-[#e6e3d9]/20 bg-[#0a0a0a]/95" : ""
      }`}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="font-mono text-md font-medium tracking-tight">
          {/* <span className="text-[#0ce642]">~</span>{" "} */}
          <span className="text-[#e6e3d9]">FA</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {navegacion.map((item) => (
            <Link
              key={item.numero}
              href={item.href}
              className="group relative font-mono text-sm uppercase tracking-widest text-[#e6e3d9]/50 transition-colors hover:text-[#e6e3d9]"
            >
              {/* Se comenta el número  */}
              {/* <span className="mr-2 text-[#e6e3d9]/20">{item.numero}</span> */}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                {item.label}
              </span>
              <span className="absolute -bottom-0.5 left-0 w-0 bg-[#0ce642] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Boton para terminal */}
        <div className="hidden md:flex items-center">
          <button
            type="button"
            className="relative bg-[#f4f2ea] hover:bg-white px-5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[#0a0a0a] rounded-sm border-2 border-[#f4f2ea] shadow-[0_4px_0_#555] transition-all duration-150 hover:translate-y- hover:shadow-[0_2px_0_#555] active:translate-y- active:shadow-none"
          >
            TERMINAL
          </button>
        </div>



        {/* Mobile Menu Button */}
        <button
          className="flex flex-col items-center justify-center gap-1.25 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 bg-[#e6e3d9] transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-[#e6e3d9] transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-[#e6e3d9] transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-[#e6e3d9]/10 bg-[#0a0a0a] px-6 py-4">
          {navegacion.map((item) => (
            <Link
              key={item.numero}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 py-3 font-mono text-[11px] uppercase tracking-widest text-[#e6e3d9]/60 transition-colors hover:text-[#e6e3d9] hover:pl-2"
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
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const roles = [
      "full_stack_developer",
      "cloud_developer",
      "backend_developer",
      "data_engineering"
  ]
  
  const [roleIndex, setRoleIndex] = useState(0)
  const [terminalRestarting, setTerminalRestarting] = useState(false) //Variable de reinicio de terminal
  
  const [isPixel, setIsPixel] = useState(false);
  const [transitionText, setTransitionText] = useState("");

  /* Efecto */
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPixel((current) => !current);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /* Transición de Imagen */
  useEffect(() => {
    const timer = setTimeout(() => {
      setTransitionText(isPixel ? "PIXEL_MODE: ON" : "RESTORING_IMAGE...");
      const cleanup = setTimeout(() => setTransitionText(""), 1500);
      return () => clearTimeout(cleanup);
    }, 50);
    return () => clearTimeout(timer);
  }, [isPixel]);

  /* Efecto de terminal */
  useEffect(() => {
    const interval = setInterval(() =>{
      setTerminalRestarting(true)

      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % roles.length)
        setTerminalRestarting(false)
      }, 1000)
    }, 5000)

    return () => {
      clearInterval(interval);
    }
  }, [roles.length])


  return (
    <section className="relative min-h-screen px-6 pb-16 pt-10">
      <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-16 md:grid-cols-[0.8fr_1.2fr]">

        {/* FOTO */}
        <div className="order-2 md:order-1">

          <div className="relative aspect-4/5 w-full max-w-sm overflow-hidden border border-[#e6e3d9]/10">

            {/* FOTO NORMAL */}
            <Image
              src="/assets/images/FavioAsturimac.png"
              alt="Favio Asturimac"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 400px"
              className={`object-cover transition-all duration-700 ${
                isPixel ? "scale-105 opacity-0" : "scale-100 opacity-100"
              }`}
            />

            {/* PIXEL ART */}
            <Image
              src="/assets/images/PixelFavio.png"
              alt="Favio Asturimac pixel art"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 400px"
              className={`object-cover transition-all duration-700 ${
                isPixel ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

            {/* Label */}
            <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-widest text-white/60">
              IMG_001 / FAVIO
            </div>

          </div>

          <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-widest text-[#e6e3d9]/30">
            <span>{isPixel ? "PIXEL_MODE" : "PORTRAIT"}</span>
            <span>{isPixel ? "8BIT" : "001"}</span>
          </div>

          {/* Transición de modo */}
          {transitionText && (
            <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-[#0ce642]">
              {transitionText}
            </div>
          )}

        </div>

        {/* TEXTO */}
        <div className="order-1 md:order-2">

          {/* System information */}
          <div className="mb-8 flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-[#e6e3d9]/40">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0ce642]" />
            <span>System initialized</span>
            <span className="text-[#e6e3d9]/20">{`//`}</span>
            <span>v1.0.0</span>
          </div>

          {/* Section */}
          <p className="font-mono text-sm tracking-widest text-[#e6e3d9]/40">
            00 / INTRO
          </p>

          {/* Name */}
          <h1 className="mt-6 text-6xl font-medium leading-[0.9] tracking-tighter text-[#e6e3d9] sm:text-7xl md:text-8xl lg:text-[9rem]">
            Favio<br />
            <span className="text-[#e6e3d9]/30">Asturimac</span>
          </h1>

          {/* Role */}
          <div className="mt-8 border-l border-[#e6e3d9]/20 pl-4">
            <p className="font-mono text-sm uppercase tracking-widest text-[#e6e3d9]/40">
              Full Stack Developer
            </p>
            <p className="mt-3 max-w-lg text-base leading-relaxed text-[#e6e3d9]/60 md:text-lg">
                Desarrollo soluciones digitales integrando software, cloud, datos e inteligencia artificial, con enfoque en crear productos funcionales, escalables y orientados a resolver problemas reales.
            </p>
          </div>

          {/* Terminal */}
          <div>
            
            <div className="mt-10 max-w-lg border border-[#e6e3d9]/10 bg-[#e6e3d9]/2  font-mono text-sm leading-6 text-white">
              {/* Cabecera del terminal */}
              <div className="flex items-center border-b gap-1.5 p-2">

                <span className="h-3 w-3 rounded-full bg-red-500"></span>
                <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
                <span className="h-3 w-3 rounded-full bg-green-500"></span>

                <span className="text-xs text-gray-300">
                  favio-terminal
                </span>
                
              </div>

              <div
                className={`p-3 transition-opacity duration-300 ${
                  terminalRestarting ? "opacity-30" : "opacity-100"
                }`}
              >
                {terminalRestarting ? (
                  <p className="text-[#0ce642]/80 animate-pulse">
                    $ restarting_terminal...
                  </p>
                ) : (
                  <>
                    <p>
                      <span className="text-[#0ce642]/80">$</span> whoami
                    </p>

                    <p className="text-[#e6e3d9]/60">
                      → {roles[roleIndex]}
                    </p>

                    <p>
                      <span className="text-[#0ce642]/80">$</span> status
                    </p>

                    <p className="text-[#e6e3d9]/60">
                      → disponible_para_proyectos_
                    </p>
                  </>
                )}
              </div>


          </div>
          </div>


          {/* CTA */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-4 border border-[#e6e3d9]/30 px-5 py-3 font-mono text-sm uppercase tracking-widest text-[#e6e3d9] transition-all duration-300 hover:bg-[#e6e3d9] hover:text-black"
            >
              Proyectos
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center border border-transparent px-5 py-3 font-mono text-sm uppercase tracking-widest text-[#e6e3d9]/40 transition-colors hover:text-[#e6e3d9]"
            >
              Contactame
            </a>
          </div>

        </div>

      </div>

      {/* Bottom information */}
      {/* <div className="mx-auto mt-8 flex max-w-7xl items-center justify-between border-t border-[#e6e3d9]/10 pt-4 font-mono text-[10px] uppercase tracking-widest text-[#e6e3d9]/30">
        <span>PERU / 2026</span>
        <span className="hidden sm:block">SCROLL TO EXPLORE ↓</span>
        <span>01 — 05</span>
      </div> */}

    </section>
  );
}

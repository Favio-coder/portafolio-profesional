"use client";

import { useState, useEffect, useRef, useCallback } from "react";


const aboutDescription = `Soy Richard Favio Asturimac Medina, desarrollador full stack e ingeniero de sistemas del IX Ciclo, apasionado por la inteligencia artificial y la computacion en la nube.`;

const additionalInfo = `Especializado en QA, data engineering, cloud computing y desarrollo full stack. Dominio React, Next.js, Vue.js, Spring Boot, Laravel, AWS, Google Cloud y Azure. Actualmente desarrollo Healthtech con Alzhivida y proyectos de IA con aprendizaje no supervisado.`;

export default function About() {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"idle" | "typing" | "complete">("idle");
  const [cursorVisible, setCursorVisible] = useState(true);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const runTypewriter = useCallback(() => {
    const chars = Array.from(aboutDescription);
    const addChar = () => {
      if (indexRef.current < chars.length) {
        const char = chars[indexRef.current];
        indexRef.current += 1;
        setDisplayText((prev) => prev + char);
        timerRef.current = [
          ...(timerRef.current || []),
          setTimeout(addChar, 40),
        ];
      } else {
        setPhase("complete");
      }
    };
    addChar();
  }, []);

  useEffect(() => {
    if (phase !== "typing") return;
    indexRef.current = 0;

    runTypewriter();
    return () => {
      (timerRef.current || []).forEach(clearTimeout);
      timerRef.current = [];
    };
  }, [phase, runTypewriter]);

  useEffect(() => {
    const timer = setTimeout(() => setPhase("typing"), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    // Se quito el min-h-screen
    <section id="about" className="relative  px-6 py-10 md:px-8"> 
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
        <div className="pixel-font absolute top-20 left-[10%] whitespace-nowrap">
          <div className="animate-marquee font-mono text-[140px] font-black uppercase leading-none tracking-tight text-[#21221e]">
            FAVIO&nbsp;&nbsp;✦&nbsp;&nbsp;FAVIO
            &nbsp;&nbsp;✦&nbsp;&nbsp;FAVIO&nbsp;&nbsp;✦&nbsp;&nbsp;FAVIO
            &nbsp;&nbsp;✦
          </div>
        </div>

        <div className="pixel-font absolute top-64 left-[30%] whitespace-nowrap">
          <div className="animate-marquee-reverse font-mono text-[140px] font-black uppercase leading-none tracking-tight text-[#f4f2ea]">
            ASTURIMAC&nbsp;&nbsp;✦&nbsp;&nbsp;ASTURIMAC&nbsp;&nbsp;✦&nbsp;&nbsp;ASTURIMAC&nbsp;&nbsp;✦&nbsp;&nbsp;ASTURIMAC&nbsp;&nbsp;✦&nbsp;&nbsp;ASTURIMAC&nbsp;&nbsp;✦
          </div>
        </div>

        <div className="pixel-font not-visited:absolute top-105 left-[10%] whitespace-nowrap">
          <div className="animate-marquee font-mono text-[140px] font-black uppercase leading-none tracking-tight text-[#21221e]">
            FAVIO&nbsp;&nbsp;✦&nbsp;&nbsp;FAVIO
            &nbsp;&nbsp;✦&nbsp;&nbsp;FAVIO&nbsp;&nbsp;✦&nbsp;&nbsp;FAVIO
            &nbsp;&nbsp;✦
          </div>
        </div>
      </div>

      {/* Contenido sobre mí */}
      <div className="relative z-10 mx-auto max-w-4xl mb-3">
        <div className="mb-12">
          <p className="font-mono text-sm uppercase tracking-widest text-white">
            01 / SOBRE MÍ
          </p>
        </div>

        <div className="overflow-hidden border-4 border-[#e6e3d9]/10 bg-[#24231f] p-6 md:p-8 rounded-sm">
          <div className="mb-6 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white" />
            <span className="font-mono text-xs uppercase tracking-widest text-white">
              RICHARD FAVIO ASTURIMAC MEDINA / SOBRE MÍ
            </span>
          </div>

          <div className="mb-6 font-mono text-sm text-[#0ce642]/80">
            {'$ print("Descripcion")'}
          </div>

          <div className="min-h-25 font-mono text-lg leading-relaxed text-[#e6e3d9]/70">
            {displayText}
            {phase !== "complete" && (
              <span
                className={`text-[#e6e3d9] transition-opacity duration-100 ${
                  cursorVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                _
              </span>
            )}
          </div>

          {phase === "complete" && (
            <>
              <div className="mt-6 space-y-3">
                <p className="font-mono text-sm uppercase tracking-widest text-[#e6e3d9]/40">
                  {`// adicional_informacion`}
                </p>
                <p className="font-mono text-base leading-relaxed text-[#e6e3d9]/50">
                  {additionalInfo}
                </p>
              </div>
            </>
          )}

          <div className="mt-4 flex items-center gap-2">
            <span
              className={`font-mono text-lg text-[#0ce642] transition-opacity duration-100 ${
                cursorVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              _
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

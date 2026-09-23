"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";

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
    <section id="about" className="relative min-h-[85vh] px-6 py-10 md:px-8 overflow-hidden">
      {/* Background typographic */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
        <div className="absolute top-[clamp(80px,15vh,180px)] left-1/2 -translate-x-1/2 w-full overflow-hidden">
          <Marquee speed="fast">
            <span className="pixel-font font-mono font-black text-[clamp(32px,6vw,80px)] uppercase text-[#21221e] mx-4">
              FAVIO ✦ FAVIO ✦ FAVIO ✦ FAVIO ✦ FAVIO ✦ FAVIO ✦ FAVIO ✦ FAVIO
            </span>
          </Marquee>
        </div>
        <div className="absolute top-[clamp(160px,30vh,300px)] left-1/2 -translate-x-1/2 w-full overflow-hidden">
          <Marquee direction="right" speed="fast">
            <span className="pixel-font font-mono font-black text-[clamp(32px,6vw,80px)] uppercase text-[#f4f2ea]/15 mx-4">
              ASTURIMAC ✦ ASTURIMAC ✦ ASTURIMAC ✦ ASTURIMAC ✦ ASTURIMAC ✦ ASTURIMAC ✦ ASTURIMAC ✦ ASTURIMAC
            </span>
          </Marquee>
        </div>
        <div className="absolute top-[clamp(320px,60vh,420px)] left-1/2 -translate-x-1/2 w-full overflow-hidden">
          <Marquee speed="fast">
            <span className="pixel-font font-mono font-black text-[clamp(32px,6vw,80px)] uppercase text-[#21221e] mx-4">
              FAVIO ✦ FAVIO ✦ FAVIO ✦ FAVIO ✦ FAVIO ✦ FAVIO ✦ FAVIO ✦ FAVIO
            </span>
          </Marquee>
        </div>
        <div className="absolute top-[clamp(6px,120vh,540px)] left-1/2 -translate-x-1/2 w-full overflow-hidden">
          <Marquee direction="right" speed="fast">
            <span className="pixel-font font-mono font-black text-[clamp(32px,6vw,80px)] uppercase text-[#f4f2ea]/15 mx-4">
              ASTURIMAC ✦ ASTURIMAC ✦ ASTURIMAC ✦ ASTURIMAC ✦ ASTURIMAC ✦ ASTURIMAC ✦ ASTURIMAC ✦ ASTURIMAC
            </span>
          </Marquee>
        </div>
      </div>

      {/* Contenido sobre mí */}
      <div className="relative z-10 mx-auto max-w-4xl pb-8">
        <Reveal delay={0.1}>
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
        </Reveal>
      </div>
    </section>
  );
}

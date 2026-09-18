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
        timerRef.current = [...(timerRef.current || []), setTimeout(addChar, 40)];
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
    <section id="about" className="relative min-h-screen px-6 py-20 md:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <p className="font-mono text-sm uppercase tracking-widest text-white">
            01 / ABOUT
          </p>
        </div>

        <div className="overflow-hidden border border-[#e6e3d9]/10 bg-[#0a0a0a]/80 p-6 md:p-8">
          <div className="mb-6 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-white" />
            <span className="font-mono text-xs uppercase tracking-widest text-white">
              RICHARD FAVIO ASTURIMAC MEDINA / ABOUT
            </span>
          </div>

          <div className="mb-6 font-mono text-sm text-[#0ce642]/80">
            {"$ print(\"Descripcion\")"}
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
                  {`// additional_information`}
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

"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const aboutDescription = `AQUÍ COLOCARÉ MI DESCRIPCIÓN PERSONAL.`;

export default function About() {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"idle" | "typing" | "complete">("idle");
  const [cursorVisible, setCursorVisible] = useState(true);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const runTypewriter = useCallback(() => {
    const chars = aboutDescription.split("");
    const addChar = () => {
      if (indexRef.current < chars.length) {
        setDisplayText((prev) => prev + chars[indexRef.current]);
        indexRef.current += 1;
        timerRef.current = [...(timerRef.current || []), setTimeout(addChar, 50)];
      } else {
        setPhase("complete");
      }
    };
    addChar();
  }, []);

  useEffect(() => {
    if (phase !== "typing") return;
    runTypewriter();
    return () => {
      (timerRef.current || []).forEach(clearTimeout);
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
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#e6e3d9]/40">
            01 / ABOUT
          </p>
        </div>

        <div className="overflow-hidden border border-[#e6e3d9]/10 bg-[#0a0a0a]/80 p-6 md:p-8">
          <div className="mb-6 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#e6e3d9]/10" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#e6e3d9]/30">
              FAVIO_OS / ABOUT
            </span>
          </div>

          <div className="mb-6 font-mono text-[10px] text-[#0ce642]/80">
            {"$ print(\"Descripcion\")"}
          </div>

          <div className="min-h-[100px] font-mono text-sm leading-relaxed text-[#e6e3d9]/70">
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
                <p className="font-mono text-[10px] uppercase tracking-widest text-[#e6e3d9]/40">
                  {`// additional_information`}
                </p>
                <p className="font-mono text-xs leading-relaxed text-[#e6e3d9]/50">
                  [ADD_DESCRIPTION]
                </p>
                <p className="font-mono text-xs leading-relaxed text-[#e6e3d9]/40">
                  [ADD_MORE_INFO]
                </p>
              </div>
            </>
          )}

          <div className="mt-4 flex items-center gap-2">
            <span
              className={`font-mono text-base text-[#0ce642] transition-opacity duration-100 ${
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

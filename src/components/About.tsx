"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionDivider from "@/components/ui/SectionDivider";
import TerminalLabel from "@/components/ui/TerminalLabel";
import Tag from "@/components/ui/Tag";

const aboutDescription = `AQUÍ COLOCARÉ MI DESCRIPCIÓN PERSONAL.
Estudiante de IX Ciclo de Ingeniería de Sistemas.
Desarrollador Full Stack con interés en Cloud, Data Engineering e IA.
Experiencia en hackathons, startups y productos reales.`;

const additionalInfo = `Especializado en QA, data engineering, cloud computing y desarrollo full stack.
Dominio: React, Next.js, TypeScript, Python, Spring Boot, Laravel, AWS, Google Cloud, Azure.
Actualmente desarrollando Healthtech con Alzhivida y proyectos de IA con aprendizaje no supervisado.`;

const stats = [
  { label: "AÑOS EXPERIENCIA", value: "3+" },
  { label: "PROYECTOS ENTREGADOS", value: "15+" },
  { label: "TECNOLOGÍAS DOMINADAS", value: "20+" },
  { label: "HACKATHONS", value: "8+" },
];

export default function About() {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"idle" | "typing" | "complete">("idle");
  const [cursorVisible, setCursorVisible] = useState(true);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const runTypewriter = () => {
    const chars = Array.from(aboutDescription);
    const addChar = () => {
      if (indexRef.current < chars.length) {
        const char = chars[indexRef.current];
        indexRef.current += 1;
        setDisplayText((prev) => prev + char);
        timerRef.current = [
          ...(timerRef.current || []),
          setTimeout(addChar, 25),
        ];
      } else {
        setPhase("complete");
      }
    };
    addChar();
  };

  useEffect(() => {
    if (phase !== "typing") return;
    indexRef.current = 0;
    runTypewriter();
    return () => {
      (timerRef.current || []).forEach(clearTimeout);
      timerRef.current = [];
    };
  }, [phase]);

  useEffect(() => {
    const timer = setTimeout(() => setPhase("typing"), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="relative px-6 py-20 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          number="01"
          title="SOBRE MÍ"
          subtitle="Perfil técnico y trayectoria profesional"
        />

        <SectionDivider className="my-12" label="MANIFIESTO" thick />

        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border border-[var(--border)] bg-[var(--card)] p-6 md:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                  FAVIO_ASTURIMAC / ABOUT.MD
                </span>
              </div>

              <TerminalLabel prompt="$" animated variant="default" className="text-sm">
                {`print("Descripcion")`}
              </TerminalLabel>

              <div className="mt-6 min-h-[200px] font-mono text-base leading-relaxed text-[var(--foreground)]">
                {displayText}
                {phase !== "complete" && (
                  <span
                    className={`inline-block ml-1 animate-pulse ${
                      cursorVisible ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  >
                    █
                  </span>
                )}
              </div>

              {phase === "complete" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-8 space-y-4"
                >
                  <SectionDivider label="ADICIONAL" />
                  <p className="font-mono text-sm leading-relaxed text-[var(--muted-foreground)]">
                    {additionalInfo}
                  </p>
                </motion.div>
              )}

              <div className="mt-6 flex items-center gap-2">
                <span
                  className={`font-mono text-lg text-[var(--primary)] ${
                    cursorVisible ? "opacity-100 animate-pulse" : "opacity-0"
                  }`}
                  aria-hidden="true"
                >
                  _
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-5 border border-[var(--border)] bg-[var(--card)] transition-all hover:border-[var(--primary)] hover:shadow-lg"
                >
                  <p className="font-heading font-black text-3xl md:text-4xl text-[var(--foreground)]">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border border-[var(--border)] bg-[var(--card)] p-6 md:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                  STACK_TECNOLÓGICO
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "Node.js",
                  "Python",
                  "Spring Boot",
                  "Laravel",
                  "AWS",
                  "Google Cloud",
                  "TensorFlow",
                  "Rasa",
                  "PostgreSQL",
                  "Docker",
                  "Git",
                ].map((tech) => (
                  <Tag key={tech} variant="outline" size="sm">
                    {tech}
                  </Tag>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border border-[var(--border)] bg-[var(--card)] p-6 md:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                  ENFOQUE ACTUAL
                </span>
              </div>

              <div className="space-y-3">
                {[
                  "Cloud Architecture & Serverless",
                  "Data Pipelines & Engineering",
                  "MLOps & Model Deployment",
                  "Full Stack Product Development",
                  "Developer Experience & Tooling",
                ].map((focus, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-[var(--muted)] rounded-sm transition-all hover:bg-[var(--secondary)]"
                  >
                    <span className="h-2 w-2 rounded-full bg-[var(--primary)]" />
                    <span className="font-mono text-sm text-[var(--foreground)]">{focus}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border border-[var(--border)] bg-[var(--card)] p-6 md:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                  CERTIFICACIONES
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { name: "CAPM®", issuer: "PMI", year: "2024" },
                  { name: "AWS Cloud Practitioner", issuer: "Amazon", year: "2023" },
                  { name: "Google Cloud Fundamentals", issuer: "Google", year: "2023" },
                ].map((cert, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-[var(--muted)] rounded-sm"
                  >
                    <div>
                      <p className="font-medium text-[var(--foreground)]">{cert.name}</p>
                      <p className="font-mono text-xs text-[var(--muted-foreground)]">{cert.issuer}</p>
                    </div>
                    <span className="badge badge-primary">{cert.year}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
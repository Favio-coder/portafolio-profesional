"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionDivider from "@/components/ui/SectionDivider";
import TerminalLabel from "@/components/ui/TerminalLabel";
import Tag from "@/components/ui/Tag";

const aboutDescription = `Estudiante de IX Ciclo de Ingeniería de Sistemas.
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
  const [typed, setTyped] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef);
  const reduced = useReducedMotion();
  const indexRef = useRef(0);
  const displayText = reduced ? aboutDescription : typed;
  const phase = displayText.length === aboutDescription.length ? "complete" : "typing";

  useEffect(() => {
    if (!visible || reduced || indexRef.current >= aboutDescription.length) return;
    const timer = setInterval(() => {
      indexRef.current += 1;
      setTyped(aboutDescription.slice(0, indexRef.current));
      if (indexRef.current >= aboutDescription.length) clearInterval(timer);
    }, 25);
    return () => clearInterval(timer);
  }, [visible, reduced]);

  return (
    <section
      id="about"
      ref={sectionRef}
      data-active={visible}
      className="about-section relative px-4 pb-6 pt-10 sm:px-6 md:pb-10 md:pt-14 lg:px-12"
    >
      <div className="mx-auto max-w-350">
        <SectionHeading
          number="01"
          title="SOBRE MÍ"
          subtitle="Perfil técnico y trayectoria profesional"
        />

        <SectionDivider className="my-6 md:my-8" label="MANIFIESTO" thick />

        <div className="about-layout grid gap-4 md:grid-cols-[1.1fr_.9fr] lg:gap-8">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border border-border bg-card p-4 md:p-5"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  FAVIO_ASTURIMAC / ABOUT.MD
                </span>
              </div>

              <TerminalLabel
                prompt="$"
                animated
                variant="default"
                className="text-sm"
              >
                {`print("Descripcion")`}
              </TerminalLabel>

              <div className="relative mt-3 font-mono text-sm leading-relaxed text-foreground sm:text-base">
                <p className="invisible" aria-hidden="true">{aboutDescription}</p>
                <span className="sr-only">{aboutDescription}</span>
                <div className="absolute inset-0" aria-hidden="true">{displayText}
                {phase !== "complete" && (
                  <span
                    className="about-cursor ml-1 inline-block"
                    aria-hidden="true"
                  >
                    █
                  </span>
                )}
                </div>
              </div>

              {(
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: phase === "complete" ? 1 : 0, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-4 space-y-3"
                  aria-hidden={phase !== "complete"}
                >
                  <SectionDivider label="ADICIONAL" />
                  <p className="font-mono text-sm leading-relaxed text-muted-foreground">
                    {additionalInfo}
                  </p>
                </motion.div>
              )}

              <div className="mt-2 flex items-center gap-2">
                <span
                  className="about-cursor font-mono text-lg text-primary-ink"
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
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="grid grid-cols-2 gap-2 lg:grid-cols-4"
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="border border-border bg-card p-3 transition-all hover:border-primary hover:shadow-lg sm:p-4"
                >
                  <p className="font-heading font-black text-2xl text-foreground sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="about-details grid grid-cols-2 gap-3 md:grid-cols-1 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="about-stack col-span-2 overflow-hidden border border-border bg-card p-4 md:col-span-1 md:p-5 lg:col-span-2"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  STACK_TECNOLÓGICO
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "Next.js",
                  "Vue.js",
                  "Angular",
                  "Inertia.js",
                  "JavaScript",
                  "TypeScript",
                  "Tailwind CSS",
                  "Node.js",
                  "Python",
                  "Java",
                  "PHP",
                  "SQL",
                  "Spring Boot",
                  "Laravel",
                  "Django",
                  "FastAPI",
                  "AWS",
                  "AWS EC2",
                  "AWS S3",
                  "AWS Athena",
                  "Azure",
                  "Google Cloud",
                  "TensorFlow",
                  "Rasa",
                  "MediaPipe",
                  "OpenCV",
                  "PostgreSQL",
                  "SQL Server",
                  "MySQL",
                  "MariaDB",
                  "Supabase",
                  "Redis",
                  "Power BI",
                  "DAX",
                  "Google Sheets",
                  "Apache Airflow",
                  "Docker",
                  "Docker Compose",
                  "Git",
                  "GitHub Actions",
                  "Azure DevOps",
                  "Cypress",
                  "Pest",
                  "PHPUnit",
                  "Pytest",
                  "Postman",
                  "JMeter",
                  "SonarQube",
                  "Jira",
                  "Zephyr",
                  "Vite",
                  "Astro",
                  "Starlight",
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
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="overflow-hidden border border-border bg-card p-3 md:p-4"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  ENFOQUE ACTUAL
                </span>
              </div>

              <div className="space-y-2">
                {[
                  "Cloud Architecture & Serverless",
                  "Data Pipelines & Engineering",
                  "MLOps & Model Deployment",
                  "Full Stack Product Development",
                  "Developer Experience & Tooling",
                ].map((focus, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 rounded-sm bg-muted p-2 transition-all hover:bg-secondary sm:items-center sm:gap-3 sm:p-3"
                  >
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <span className="font-mono text-xs leading-snug text-foreground sm:text-sm">
                      {focus}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="overflow-hidden border border-border bg-card p-3 md:p-4"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  CERTIFICACIONES
                </span>
              </div>

              <div className="space-y-2">
                {[
                  {
                    name: "CAPM®",
                    issuer: "PMI",
                    year: "2024",
                    url: "https://www.credly.com/badges/f8d055a3-4669-4916-b677-ee2bbf5b5536/public_url",
                  },
                  {
                    name: "AWS Architect",
                    issuer: "Universidad Nacional de Ingeniería",
                    year: "2025",
                    url: "",
                  },
                  {
                    name: "AWS Cloud Practicioner",
                    issuer: "AWS",
                    year: "Pronto...",
                    url: "",
                  },
                ].map((cert) => {
                  const url = cert.url?.trim();
                  const Tag = url ? "a" : "div";

                  return (
                    <Tag
                      key={`${cert.name}-${cert.issuer}`}
                      {...(url
                        ? {
                            href: url,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            "aria-label": `Ver certificación ${cert.name} (abre en otra pestaña)`,
                          }
                        : {})}
                      className={`flex min-w-0 flex-col items-start gap-1 rounded-sm bg-muted p-2 sm:flex-row sm:items-center sm:justify-between ${
                        url
                          ? "cursor-pointer transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          : ""
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-foreground">
                          {cert.name}
                        </p>
                        <p className="font-mono text-xs text-muted-foreground">
                          {cert.issuer}
                        </p>
                      </div>
                      <span className="badge badge-primary">{cert.year}</span>
                    </Tag>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

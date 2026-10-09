"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionDivider from "@/components/ui/SectionDivider";
import Tag from "@/components/ui/Tag";

const experiences = [
  {
    role: "Full Stack Developer / Co-Founder",
    company: "Alzhivida",
    period: "2023 — Presente",
    location: "Lima, Perú",
    type: "Startup / Healthtech",
    description: "Liderazgo técnico y desarrollo de plataforma de salud mental para cuidadores de Alzheimer. Arquitectura full stack, infraestructura cloud, pipelines de datos y modelos de IA para detección temprana.",
    technologies: ["React", "Next.js", "TypeScript", "Python", "TensorFlow", "AWS", "Docker", "PostgreSQL"],
    achievements: [
      "Plataforma usada por 500+ cuidadores activos",
      "Modelo de detección Alzheimer con 92% precisión",
      "Infraestructura serverless en AWS (Lambda, API Gateway, S3)",
      "Pipeline CI/CD automatizado con GitHub Actions",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "Empresa Tecnológica",
    period: "2022 — 2023",
    location: "Lima, Perú",
    type: "Prácticas Preprofesionales",
    description: "Desarrollo y mantenimiento de aplicaciones web empresariales. Migración de legado a stack moderno, testing automatizado y optimización de performance.",
    technologies: ["Vue.js", "Laravel", "MySQL", "Docker", "Kubernetes", "GitLab CI"],
    achievements: [
      "Migración exitosa de 3 módulos legacy a Vue 3",
      "Reducción 40% en tiempo de respuesta API",
      "Cobertura de tests aumentada del 15% al 85%",
    ],
  },
  {
    role: "Research Assistant - IA",
    company: "Universidad - Laboratorio de IA",
    period: "2021 — 2022",
    location: "Lima, Perú",
    type: "Investigación Académica",
    description: "Investigación en visión por computadora para diagnóstico médico. Entrenamiento de redes neuronales con TensorFlow/PyTorch, preprocesamiento de datos DICOM, publicación en congreso internacional.",
    technologies: ["Python", "TensorFlow", "PyTorch", "OpenCV", "DICOM", "Jupyter"],
    achievements: [
      "Paper aceptado en Congreso Internacional de IA 2022",
      "Modelo de segmentación tumoral con Dice 0.89",
      "Dataset curado de 2000+ escáneres médicos",
    ],
  },
];

const hackathons = [
  { name: "Hackathon BCP Datathon", year: "2024", position: "Top 10", focus: "Data Science / Financial" },
  { name: "NASA Space Apps Challenge", year: "2023", position: "Finalista Local", focus: "Space Tech / Earth Observation" },
  { name: "Hackathon UNI", year: "2023", position: "1er Puesto", focus: "Healthtech / Social Impact" },
  { name: "Hackathon Tecsup", year: "2022", position: "2do Puesto", focus: "EdTech / Accessibility" },
];

export default function Experience() {
  return (
    <section id="experience" className="relative px-6 py-20 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          number="02"
          title="EXPERIENCIA"
          subtitle="Trayectoria profesional, investigación y competencias"
        />

        <SectionDivider className="my-12" label="TIMELINE" thick />

        <div className="space-y-12">
          {experiences.map((exp, expIndex) => (
            <motion.article
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: expIndex * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="absolute left-8 top-0 bottom-0 w-px bg-[var(--border)] lg:left-[200px]" />
              
              <div className="relative pl-20 lg:pl-[220px]">
                <div className="absolute left-8 top-1 w-4 h-4 rounded-full bg-[var(--primary)] border-4 border-[var(--background)] lg:left-[200px] -translate-x-1/2" aria-hidden="true" />
                
                <div className="mb-2 flex items-center gap-3 font-mono text-xs uppercase tracking-wider">
                  <span className="badge badge-primary">{exp.type}</span>
                  <span className="text-[var(--muted-foreground)]">{exp.period}</span>
                  <span className="text-[var(--border)]">·</span>
                  <span className="text-[var(--muted-foreground)]">{exp.location}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-heading text-2xl font-semibold text-[var(--foreground)]">
                      {exp.role}
                    </h3>
                    <p className="mt-1 font-medium text-[var(--accent)]">{exp.company}</p>
                  </div>

                  <p className="text-[var(--muted-foreground)] leading-relaxed max-w-2xl">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Tag key={tech} variant="outline" size="sm">
                        {tech}
                      </Tag>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                      LOGROS DESTACADOS
                    </h4>
                    <ul className="space-y-1.5 pl-4">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="relative flex items-start gap-2 text-sm text-[var(--muted-foreground)] before:content-['→'] before:text-[var(--primary)] before:font-mono before:text-xs">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}

          <SectionDivider className="my-8" label="HACKATHONS & COMPETENCIAS" thick />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {hackathons.map((hack, i) => (
              <motion.div
                key={hack.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="p-5 border border-[var(--border)] bg-[var(--card)] transition-all hover:border-[var(--accent)] hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="badge badge-accent">{hack.year}</span>
                  <span className="badge badge-primary">{hack.position}</span>
                </div>
                <h4 className="font-medium text-[var(--foreground)] mb-1">{hack.name}</h4>
                <p className="font-mono text-xs text-[var(--muted-foreground)]">{hack.focus}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
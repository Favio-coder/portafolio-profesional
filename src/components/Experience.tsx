"use client";

import { motion, useReducedMotion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionDivider from "@/components/ui/SectionDivider";
import Tag from "@/components/ui/Tag";

type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  location?: string;
  type: string;
  description: string;
  technologies: string[];
  achievements: string[];
};

type Recognition = {
  id: string;
  name: string;
  year?: string;
  position: string;
  focus: string;
};

const experiences: ExperienceItem[] = [
  {
    id: "bst-data-quality",
    role: "Colaborador en Data Quality",
    company: "Proyecto vinculado a BST Global",
    companyUrl: "https://bstglobal.com/",
    period: "Colaboración de 2 meses",
    type: "Colaboración independiente",
    description:
      "Colaboración en calidad de datos mediante la revisión de pipelines y procedimientos almacenados. Preparé casos de prueba y realicé testing con Azure DevOps para verificar el comportamiento de los procesos.",
    technologies: ["Apache Airflow", "SQL", "Azure DevOps"],
    achievements: [
      "Revisé pipelines de datos en Apache Airflow.",
      "Analicé procedimientos almacenados y su lógica de procesamiento.",
      "Realicé testing de procesos de datos con Azure DevOps.",
      "Creé casos de prueba para verificar pipelines y procedimientos almacenados.",
    ],
  },
  {
    id: "spaceag",
    role: "Customer Success Intern",
    company: "SpaceAg",
    companyUrl: "https://www.spaceag.co/",
    period: "Set. 2025 — Jul. 2026",
    location: "Huancayo, Perú",
    type: "Business Intelligence",
    description:
      "Desarrollo de dashboards, indicadores y procesos de consolidación de datos para empresas agroexportadoras. Transformé necesidades de negocio en reportes analíticos, integrando fuentes y validando la consistencia de la información.",
    technologies: [
      "Power BI",
      "DAX",
      "SQL",
      "AWS Athena",
      "Google Sheets",
      "ETL",
      "APIs",
    ],
    achievements: [
      "Desarrollé dashboards y marcos de KPI para monitorear la generación de valor.",
      "Automaticé la consolidación de datos e informes con SQL, Google Sheets y procesos ETL.",
      "Utilicé AWS Athena, Simba Athena e integraciones de API para consultar y actualizar información.",
      "Diseñé modelos dimensionales de estrella y copo de nieve.",
      "Validé datos y reportes mediante pruebas funcionales, de regresión y controles automatizados.",
    ],
  },
  {
    id: "hospital-bi",
    role: "Desarrollador de solución BI",
    company: "Hospital Nacional Ramiro Prialé — Red Asistencial Junín",
    companyUrl: "https://www.essalud.gob.pe/hospital-nacional-ramiro-priale-priale-de-huancayo-celebro-bodas-de-plata/",
    period: "Set. 2025 — Jul. 2026",
    location: "Huancayo, Perú",
    type: "Proyección social",
    description:
      "Desarrollo de una solución de Business Intelligence para centralizar información sobre el consumo de recursos en diagnóstico por imágenes. Integré procesamiento de datos, reportes y pruebas de calidad y rendimiento.",
    technologies: [
      "Angular",
      "Python",
      "Django",
      "MariaDB",
      "SQL",
      "ETL",
      "Cypress",
      "JMeter",
    ],
    achievements: [
      "Implementé la solución con Angular, Django y MariaDB.",
      "Desarrollé procesos ETL y validaciones automatizadas para controlar la integridad de los datos.",
      "Ejecuté pruebas end-to-end sobre los flujos críticos del sistema.",
      "Realicé pruebas de estrés y rendimiento con JMeter para evaluar la respuesta ante concurrencia.",
    ],
  },
  {
    id: "c34",
    role: "Desarrollador Full Stack Junior y Soporte de TI",
    company: "C34",
    companyUrl: "https://sistemac34.com/",
    period: "Ene. 2025 — Dic. 2025",
    location: "Huancayo, Perú",
    type: "Software empresarial",
    description:
      "Desarrollo de módulos para un sistema contable y soporte de infraestructura de TI. Trabajé con lógica de negocio, persistencia de datos, pruebas y documentación técnica para productos de facturación electrónica.",
    technologies: [
      "PHP",
      "Laravel",
      "Vue.js",
      "SQL Server",
      "PHPUnit",
      "Azure",
      "AWS",
      "Astro",
      "Starlight",
    ],
    achievements: [
      "Desarrollé módulos contables con Laravel, Vue.js y SQL Server.",
      "Implementé pruebas unitarias e integración para validar funcionalidades.",
      "Elaboré documentación técnica con Astro y Starlight.",
      "Integré servicios cloud y brindé soporte de red y dispositivos POS.",
      "Apliqué prácticas de seguridad tomando como referencia OWASP Top 10 e ISO 27001.",
    ],
  },
  {
    id: "dev-stream",
    role: "Full Stack Developer Intern",
    company: "Dev Stream",
    companyUrl: "https://www.linkedin.com/company/dev-stream/",
    period: "Ene. 2024 — Abr. 2024",
    location: "Lima, Perú",
    type: "Prácticas",
    description:
      "Participación en proyectos web y formación en bases de datos, microservicios y DevOps. Colaboré en equipos Scrum, validando APIs y revisando la calidad del código.",
    technologies: [
      "Java",
      "Spring Boot",
      "Angular",
      "PostgreSQL",
      "Postman",
      "SonarQube",
      "AWS EC2",
      "AWS S3",
    ],
    achievements: [
      "Participé en proyectos con Spring Boot, PostgreSQL y Angular.",
      "Validé APIs REST y microservicios mediante Postman.",
      "Analicé mantenibilidad y vulnerabilidades con SonarQube.",
      "Utilicé AWS EC2 y S3 para despliegue y almacenamiento.",
    ],
  },
];

const recognitions: Recognition[] = [
  {
    id: "transformagob",
    name: "Hackathon Transformagob — PCM",
    position: "2.º lugar",
    focus: "Innovación y transformación digital",
  },
  {
    id: "concempi",
    name: "CONCEMPI V — PMI Lima",
    year: "2025",
    position: "Ganador",
    focus: "Competencia nacional de proyectos",
  },
  {
    id: "credicorp",
    name: "Credicorp Voices Awards",
    year: "2025",
    position: "Top 50",
    focus: "Finalista",
  },
  {
    id: "harvard-upch",
    name: "Hackathon Harvard con apoyo de UPCH",
    year: "2025",
    position: "Ganador",
    focus: "Innovación",
  },
  {
    id: "nasa-space-apps",
    name: "NASA Space Apps Challenge — Universidad Continental",
    year: "2025",
    position: "3.er lugar",
    focus: "Tecnología y datos espaciales",
  },
  {
    id: "impact-startup",
    name: "Impact Start Up Competition",
    year: "2024",
    position: "3.er lugar",
    focus: "Scale Incubator / UNT",
  },
];

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" />
    </svg>
  );
}

export default function Experience() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative px-4 py-16 sm:px-6 md:px-8 md:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-350">
        <div id="experience-title">
          <SectionHeading
            number="02"
            title="EXPERIENCIA"
            subtitle="Desarrollo, calidad de software, datos y soluciones cloud"
          />
        </div>

        <SectionDivider className="my-10 md:my-12" label="TRAYECTORIA" thick />

        <div className="space-y-10 md:space-y-12">
          {experiences.map((exp, index) => {
            // Admite web, LinkedIn u otro enlace HTTP/HTTPS.
            const url = exp.companyUrl?.trim();
            const companyUrl =
              url && /^https?:\/\//i.test(url) ? url : undefined;

            return (
              <motion.article
                key={exp.id}
                initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.5,
                  delay: reducedMotion ? 0 : Math.min(index * 0.05, 0.2),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative min-w-0 pl-7 sm:pl-10"
              >
                <div
                  className="absolute bottom-0 left-1.5 top-0 w-px bg-border"
                  aria-hidden="true"
                />

                <div
                  className="absolute left-1.5 top-1 h-3 w-3 -translate-x-1/2 rounded-full bg-primary ring-4 ring-background"
                  aria-hidden="true"
                />

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-wider">
                    <span className="badge badge-primary whitespace-normal">
                      {exp.type}
                    </span>

                    <span className="text-muted-foreground">
                      {exp.period}
                    </span>

                    {exp.location && (
                      <span className="text-muted-foreground">
                        {exp.location}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-heading text-xl font-semibold leading-snug text-foreground sm:text-2xl">
                      {exp.role}
                    </h3>

                    {companyUrl ? (
                      <a
                        href={companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex max-w-full items-start gap-2 rounded-sm font-medium text-accent-ink underline-offset-4 transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                      >
                        <span className="min-w-0 break-words">
                          {exp.company}
                        </span>

                        <span className="mt-1">
                          <ExternalLinkIcon />
                        </span>

                        <span className="sr-only">
                          {" "}
                          — abrir enlace en una nueva pestaña
                        </span>
                      </a>
                    ) : (
                      <p className="mt-2 break-words font-medium text-accent-ink">
                        {exp.company}
                      </p>
                    )}
                  </div>

                  <p className="max-w-3xl leading-relaxed text-muted-foreground">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <Tag key={tech} variant="outline" size="sm">
                        {tech}
                      </Tag>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      APORTES DESTACADOS
                    </h4>

                    <ul className="max-w-3xl space-y-2">
                      {exp.achievements.map((achievement) => (
                        <li
                          key={achievement}
                          className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                        >
                          <span
                            className="mt-0.5 shrink-0 font-mono text-primary-ink"
                            aria-hidden="true"
                          >
                            →
                          </span>
                          <span className="min-w-0">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <SectionDivider
          className="my-10 md:my-12"
          label="HACKATHONS & RECONOCIMIENTOS"
          thick
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {recognitions.map((recognition, index) => (
            <motion.article
              key={recognition.id}
              initial={reducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: reducedMotion ? 0 : 0.45,
                delay: reducedMotion ? 0 : index * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex min-w-0 flex-col border border-border bg-card p-5 transition-colors hover:border-accent motion-safe:transition-shadow motion-safe:hover:shadow-lg"
            >
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {recognition.year && (
                  <span className="badge badge-accent">
                    {recognition.year}
                  </span>
                )}

                <span className="badge badge-primary">
                  {recognition.position}
                </span>
              </div>

              <h3 className="mb-2 font-medium leading-snug text-foreground">
                {recognition.name}
              </h3>

              <p className="mt-auto font-mono text-xs leading-relaxed text-muted-foreground">
                {recognition.focus}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
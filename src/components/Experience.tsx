"use client";

import { motion, useReducedMotion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionDivider from "@/components/ui/SectionDivider";
import Tag from "@/components/ui/Tag";
import { useLanguage } from "@/lib/i18n";

type ExperienceItemBase = {
  id: string;
  period: string;
  location?: string;
  type: string;
  technologies: string[];
  companyUrl?: string;
};

type ExperienceItem = ExperienceItemBase & {
  roleKey: string;
  companyKey: string;
  descriptionKey: string;
  achievementKeys: string[];
};

type Recognition = {
  id: string;
  nameKey: string;
  year?: string;
  positionKey: string;
  focusKey: string;
};

const experienceBases: ExperienceItemBase[] = [
  {
    id: "bst-data-quality",
    period: "Colaboración de 2 meses",
    type: "Colaboración independiente",
    technologies: ["Apache Airflow", "SQL", "Azure DevOps"],
    companyUrl: "https://bstglobal.com/",
  },
  {
    id: "spaceag",
    period: "Set. 2025 — Jul. 2026",
    location: "Huancayo, Perú",
    type: "Business Intelligence",
    technologies: ["Power BI", "DAX", "SQL", "AWS Athena", "Google Sheets", "ETL", "APIs"],
    companyUrl: "https://www.spaceag.co/",
  },
  {
    id: "hospital-bi",
    period: "Set. 2025 — Jul. 2026",
    location: "Huancayo, Perú",
    type: "Proyección social",
    technologies: ["Angular", "Python", "Django", "MariaDB", "SQL", "ETL", "Cypress", "JMeter"],
    companyUrl: "https://www.essalud.gob.pe/hospital-nacional-ramiro-priale-priale-de-huancayo-celebro-bodas-de-plata/",
  },
  {
    id: "c34",
    period: "Ene. 2025 — Dic. 2025",
    location: "Huancayo, Perú",
    type: "Software empresarial",
    technologies: ["PHP", "Laravel", "Vue.js", "SQL Server", "PHPUnit", "Azure", "AWS", "Astro", "Starlight"],
    companyUrl: "https://sistemac34.com/",
  },
  {
    id: "dev-stream",
    period: "Ene. 2024 — Abr. 2024",
    location: "Lima, Perú",
    type: "Prácticas",
    technologies: ["Java", "Spring Boot", "Angular", "PostgreSQL", "Postman", "SonarQube", "AWS EC2", "AWS S3"],
    companyUrl: "https://www.linkedin.com/company/dev-stream/",
  },
];

const recognitionBases: Recognition[] = [
  { id: "transformagob", nameKey: "exp.rec.transformagob.name", year: undefined, positionKey: "exp.rec.transformagob.position", focusKey: "exp.rec.transformagob.focus" },
  { id: "concempi", nameKey: "exp.rec.concempi.name", year: "2025", positionKey: "exp.rec.concempi.position", focusKey: "exp.rec.concempi.focus" },
  { id: "credicorp", nameKey: "exp.rec.credicorp.name", year: "2025", positionKey: "exp.rec.credicorp.position", focusKey: "exp.rec.credicorp.focus" },
  { id: "harvard-upch", nameKey: "exp.rec.harvard-upch.name", year: "2025", positionKey: "exp.rec.harvard-upch.position", focusKey: "exp.rec.harvard-upch.focus" },
  { id: "nasa-space-apps", nameKey: "exp.rec.nasa-space-apps.name", year: "2025", positionKey: "exp.rec.nasa-space-apps.position", focusKey: "exp.rec.nasa-space-apps.focus" },
  { id: "impact-startup", nameKey: "exp.rec.impact-startup.name", year: "2024", positionKey: "exp.rec.impact-startup.position", focusKey: "exp.rec.impact-startup.focus" },
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
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();

  const experiences: ExperienceItem[] = experienceBases.map((base) => ({
    ...base,
    roleKey: `exp.${base.id}.role`,
    companyKey: `exp.${base.id}.company`,
    descriptionKey: `exp.${base.id}.description`,
    achievementKeys: Array.from(
      { length: 5 },
      (_, i) => `exp.${base.id}.achievement-${i}`
    ).filter((key) => t(key) !== key),
  }));

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
            title={t("experience.title")}
            subtitle={t("experience.subtitle")}
          />
        </div>

        <SectionDivider className="my-10 md:my-12" label={t("experience.trayectoria")} thick />

        <div className="space-y-10 md:space-y-12">
          {experiences.map((exp, index) => {
            // Admite web, LinkedIn u otro enlace HTTP/HTTPS.
            const url = exp.companyUrl?.trim();
            const companyUrl =
              url && /^https?:\/\//i.test(url) ? url : undefined;
            const role = t(exp.roleKey);
            const company = t(exp.companyKey);
            const description = t(exp.descriptionKey);
            const achievements = exp.achievementKeys.map((key) => t(key));

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
                      {role}
                    </h3>

                    {companyUrl ? (
                      <a
                        href={companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex max-w-full items-start gap-2 rounded-sm font-medium text-accent-ink underline-offset-4 transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                      >
                        <span className="min-w-0 break-words">
                          {company}
                        </span>

                        <span className="mt-1">
                          <ExternalLinkIcon />
                        </span>

                        <span className="sr-only">
                          {" "}
                          {t("experience.openNewTab")}
                        </span>
                      </a>
                    ) : (
                      <p className="mt-2 break-words font-medium text-accent-ink">
                        {company}
                      </p>
                    )}
                  </div>

                  <p className="max-w-3xl leading-relaxed text-muted-foreground">
                    {description}
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
                      {t("experience.keyAchievements")}
                    </h4>

                    <ul className="max-w-3xl space-y-2">
                      {achievements.map((achievement) => (
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
          label={t("experience.hackathonsAwards")}
          thick
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {recognitionBases.map((recognition, index) => {
            const name = t(recognition.nameKey);
            const position = t(recognition.positionKey);
            const focus = t(recognition.focusKey);
            return (
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
                    {position}
                  </span>
                </div>

                <h3 className="mb-2 font-medium leading-snug text-foreground">
                  {name}
                </h3>

                <p className="mt-auto font-mono text-xs leading-relaxed text-muted-foreground">
                  {focus}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

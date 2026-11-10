"use client";
import { imageSizes } from "@/lib/image-assets";


import Image from "next/image";
import { motion } from "motion/react";
import type { Project } from "@/data/project";
import { useLanguage } from "@/lib/i18n";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useLanguage();
  return (
    <article className="project-card" aria-labelledby={`${project.id}-title`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="project-card-meta font-mono text-xs uppercase tracking-wider">
          <span>{String(index + 1).padStart(2, "0")} / {project.technologies[0]}</span>
          <span>{project.year} ↗</span>
        </div>
        <div className="project-card-body">
          <div className="flex min-w-0 flex-col items-start gap-5">
            <h3 id={`${project.id}-title`} className="project-title">{project.name}</h3>
            <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">{project.description}</p>
            <ul className="flex flex-wrap gap-2" aria-label={t("projectCard.ariaTechnologies")}>
              {project.technologies.map((tech) => <li key={tech} className="badge">{tech}</li>)}
            </ul>
            <div className="mt-auto flex flex-wrap gap-3 pt-2">
              {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-action" aria-label={t("common.viewCode", { name: project.name })}>{t("projects.viewCode")} ↗</a>}
              {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-action" aria-label={t("common.viewDemo", { name: project.name })}>{t("projects.viewDemo")} ↗</a>}
            </div>
          </div>
          <figure className="min-w-0">
            <div className="project-image">
              <Image src={project.image} alt={t("projectCard.imageAlt", { name: project.name })} fill sizes={imageSizes.project} className="object-contain" />
            </div>
            <figcaption className="mt-2 font-mono text-xs text-muted-foreground">{project.image.split("/").pop()}</figcaption>
          </figure>
        </div>
      </motion.div>
    </article>
  );
}


"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { Project } from "@/data/project";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
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
            <ul className="flex flex-wrap gap-2" aria-label="Tecnologías">
              {project.technologies.map((tech) => <li key={tech} className="badge">{tech}</li>)}
            </ul>
            <div className="mt-auto flex flex-wrap gap-3 pt-2">
              {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-action" aria-label={`Ver código de ${project.name}`}>Ver código ↗</a>}
              {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-action" aria-label={`Ver demo de ${project.name}`}>Ver demo ↗</a>}
            </div>
          </div>
          <figure className="min-w-0">
            <div className="project-image">
              <Image src={project.image} alt={`Imagen asociada a ${project.name}`} fill sizes="(min-width: 1024px) 42vw, 90vw" className="object-contain" />
            </div>
            <figcaption className="mt-2 font-mono text-xs text-muted-foreground">{project.image.split("/").pop()}</figcaption>
          </figure>
        </div>
      </motion.div>
    </article>
  );
}

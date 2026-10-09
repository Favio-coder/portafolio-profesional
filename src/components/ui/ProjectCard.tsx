"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import { Project } from "@/data/project";

interface ProjectCardProps {
  project: Project;
  index: number;
  featured?: boolean;
}

export default function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const techCategories: Record<string, string> = {
    "React": "frontend",
    "Next.js": "frontend",
    "TypeScript": "language",
    "Tailwind CSS": "frontend",
    "Node.js": "backend",
    "Spring Boot": "backend",
    "Laravel": "backend",
    "Python": "language",
    "AWS": "cloud",
    "Google Cloud": "cloud",
    "TensorFlow": "ai",
    "Rasa": "ai",
    "NLP": "ai",
    "MediaPipe": "ai",
    "OpenCV": "ai",
    "React Native": "mobile",
    "MySQL": "database",
    "PHP": "language",
    "JavaScript": "language",
    "IA": "ai",
    "Deep Learning": "ai",
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      className={`group relative overflow-hidden border border-transparent bg-[var(--card)] transition-all duration-500 ${
        featured
          ? "col-span-2 row-span-2 lg:col-span-1 lg:row-span-1"
          : ""
      }`}
    >
      <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={`Captura de ${project.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Link
            href={project.github || "#"}
            target={project.github ? "_blank" : undefined}
            rel={project.github ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-2 px-6 py-3 font-mono text-sm uppercase tracking-wider text-[var(--accent-foreground)] bg-[var(--accent)] rounded-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
            aria-label={project.github ? `Ver repositorio de ${project.name}` : undefined}
          >
            {project.github ? "Ver código →" : "Próximamente"}
          </Link>
        </div>

        <div className="absolute top-3 left-3 flex gap-2">
          <span className="badge badge-primary">
            {project.year}
          </span>
          {project.demo && (
            <span className="badge badge-accent">
              Live
            </span>
          )}
        </div>
      </div>

      <div className="p-5 pt-4">
        <div className="mb-3 flex flex-wrap gap-2">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className={`badge ${techCategories[tech] ? `badge-${techCategories[tech]}` : ""}`}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="badge">+{project.technologies.length - 5}</span>
          )}
        </div>

        <h3 className="font-heading text-xl font-semibold tracking-tight text-[var(--foreground)] mb-2">
          {project.name}
        </h3>

        <p className="text-sm leading-relaxed text-[var(--muted-foreground)] line-clamp-3">
          {project.description}
        </p>

        {project.github && (
          <div className="mt-4 pt-4 border-t border-[var(--border)]">
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline font-mono text-sm text-[var(--muted-foreground)] hover:text-[var(--accent)]"
            >
              Ver en GitHub
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
        )}
      </div>
    </motion.article>
  );
}
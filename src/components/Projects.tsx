"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionDivider from "@/components/ui/SectionDivider";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/project";

const filterCategories = ["Todos", "Full Stack", "Cloud", "Data", "AI", "Mobile"];

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 py-20 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          number="03"
          title="PROYECTOS"
          subtitle="Trabajos seleccionados — software, cloud, data e IA"
        />

        <SectionDivider className="my-12" label="FILE_SYSTEM" thick />

        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filtrar proyectos por categoría">
          {filterCategories.map((cat, i) => (
            <button
              key={cat}
              className={`px-4 py-2 font-mono text-sm uppercase tracking-wider rounded-sm transition-all ${
                i === 0
                  ? "bg-[var(--accent)] text-[var(--accent-foreground)]"
                  : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]"
              }`}
              aria-pressed={i === 0}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} featured={i === 0} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="font-mono text-sm uppercase tracking-widest text-[var(--muted-foreground)] mb-4">
            MÁS PROYECTOS EN GITHUB
          </p>
          <a
            href="https://github.com/Favio-coder"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 font-mono text-sm uppercase tracking-wider text-[var(--foreground)] border border-[var(--border)] rounded-sm hover:bg-[var(--muted)] transition-all"
          >
            Ver Perfil →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
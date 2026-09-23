"use client";

import { motion } from "motion/react";
import { projects } from "@/data/project";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative min-h-[85vh] px-6 py-16 md:px-8 overflow-hidden"
    >
      {/* Background */}

      {/* <div className="mx-auto max-w-5xl"> */}
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* <div className="mb-8">
          <p className="font-mono text-sm uppercase tracking-widest text-[#e6e3d9]/40">
            02 / PROJECTS
          </p>
        </div> */}
        <div className="mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#0ce642]/70">
            02 / PROJECTS
          </p>

          <h2 className="mt-4 text-4xl font-semibold uppercase tracking-tight text-[#e6e3d9] md:text-6xl">
            Selected Work
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#e6e3d9]/40 md:text-base">
            Proyectos construidos entre software, inteligencia artificial, cloud
            computing y data engineering.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="group relative overflow-hidden border border-[#e6e3d9]/10 bg-[#0a0a0a]/80 transition-all duration-300 hover:border-[#e6e3d9]/25 hover:-translate-y-1"
            >
              <div className="relative overflow-hidden bg-[#111]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#e6e3d9]/10">
                    {project.name}
                  </span>
                </div>
                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="font-mono text-sm uppercase tracking-widest text-[#0ce642]">
                    OPEN →
                  </span>
                </div>

                <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-widest text-[#0ce642]/60">
                  {project.year}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-mono text-base font-medium text-[#e6e3d9] mb-2">
                  {project.name}
                </h3>

                <p className="text-sm leading-relaxed text-[#e6e3d9]/40">
                  {project.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-[#e6e3d9]/10 px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-[#e6e3d9]/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

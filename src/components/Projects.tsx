"use client";

import { motion } from "motion/react";
import Marquee from "@/components/Marquee";
import { projects } from "@/data/project";

export default function Projects() {
  return (
    <section id="projects" className="relative min-h-[85vh] px-6 py-16 md:px-8 overflow-hidden">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="font-mono text-sm uppercase tracking-widest text-[#e6e3d9]/40">
            02 / PROJECTS
          </p>
        </div>

        <Marquee speed="slow">
          <span className="font-mono text-base uppercase tracking-[0.3em] text-[#e6e3d9]/10 mx-6">
            PROJECTS ✦ PROJECTS ✦ PROJECTS ✦ PROJECTS ✦ PROJECTS ✦
          </span>
        </Marquee>

        <div className="mb-12 mt-4 font-mono text-sm text-[#0ce642]/60">
          $ tree ./projects
        </div>

        <div className="overflow-hidden border border-[#e6e3d9]/10 bg-[#0a0a0a]/80 p-6 md:p-8">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[#e6e3d9]/30 mb-6">
            FAVIO_OS / PROJECTS
          </div>

          <div className="space-y-4">
            <div className="font-mono text-sm text-[#e6e3d9]/40">
              projects/
            </div>
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true, amount: 0.3 }}
                className="group"
              >
                <div className="pl-4">
                  <div className="font-mono text-sm text-[#e6e3d9]/50">
                    └── {project.name.toLowerCase()}/
                  </div>
                </div>
                <div className="pl-8">
                  <div className="font-mono text-[10px] text-[#e6e3d9]/25">
                    ├── README.md
                  </div>
                  <div className="font-mono text-[10px] text-[#e6e3d9]/25">
                    ├── stack.json
                  </div>
                  <div className="font-mono text-[10px] text-[#e6e3d9]/25">
                    └── preview.png
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

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

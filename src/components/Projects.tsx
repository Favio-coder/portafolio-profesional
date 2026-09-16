"use client";

import { projects } from "@/data/project";

export default function Projects() {
  return (
    <section id="projects" className="relative min-h-screen px-6 py-20 md:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#e6e3d9]/40">
            02 / PROJECTS
          </p>
        </div>

        {/* Terminal prompt */}
        <div className="mb-8 font-mono text-[10px] text-[#0ce642]/60">
          $ tree ./projects
        </div>

        {/* File System Tree */}
        <div className="overflow-hidden border border-[#e6e3d9]/10 bg-[#0a0a0a]/80 p-6 md:p-8">
          <div className="font-mono text-[9px] uppercase tracking-widest text-[#e6e3d9]/30 mb-6">
            FAVIO_OS / PROJECTS
          </div>

          <div className="space-y-4">
            <div className="font-mono text-[10px] text-[#e6e3d9]/40">
              projects/
            </div>
            {projects.map((project) => (
              <div key={project.id} className="group">
                <div className="pl-4">
                  <div className="font-mono text-[10px] text-[#e6e3d9]/50">
                    └── {project.name.toLowerCase()}/
                  </div>
                </div>
                <div className="pl-8">
                  <div className="font-mono text-[9px] text-[#e6e3d9]/25">
                    ├── README.md
                  </div>
                  <div className="font-mono text-[9px] text-[#e6e3d9]/25">
                    ├── stack.json
                  </div>
                  <div className="font-mono text-[9px] text-[#e6e3d9]/25">
                    └── preview.png
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden border border-[#e6e3d9]/10 bg-[#0a0a0a]/80 transition-all duration-300 hover:border-[#e6e3d9]/25 hover:-translate-y-1"
            >
              {/* Image area */}
              <div className="relative aspect-video overflow-hidden bg-[#111]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#e6e3d9]/10">
                    {project.name}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#0ce642]">
                    OPEN →
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#e6e3d9]/30">
                    {project.year}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#0ce642]/50">
                    [OPEN]
                  </span>
                </div>

                <h3 className="font-mono text-sm font-medium text-[#e6e3d9] mb-2">
                  {project.name}
                </h3>

                <p className="text-xs leading-relaxed text-[#e6e3d9]/40">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded border border-[#e6e3d9]/10 px-2 py-0.5 font-mono text-[8px] uppercase tracking-wider text-[#e6e3d9]/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

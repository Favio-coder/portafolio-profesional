"use client";

import Reveal from "@/components/Reveal";

export default function Contact() {
  return (
    <section id="contact" className="relative min-h-[85vh] px-6 py-16 md:px-8">
      <div className="mx-auto max-w-3xl">
        <Reveal delay={0.1}>
          <div className="mb-12">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#e6e3d9]/40">
              04 / CONTACT
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="overflow-hidden border border-[#e6e3d9]/10 bg-[#0a0a0a]/80 p-6 md:p-8">
            <div className="mb-6 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#e6e3d9]/10" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#e6e3d9]/30">
                FAVIO_OS / CONNECT
              </span>
            </div>

            <div className="mb-6 font-mono text-[10px] text-[#0ce642]/60">
              $ ./connect.sh
            </div>

            <div className="space-y-4">
              <div className="font-mono text-xs text-[#e6e3d9]/50">
                INITIALIZING CONNECTION...
              </div>
              <div className="h-px w-full bg-[#e6e3d9]/10" />

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#e6e3d9]/30">
                    [ EMAIL ]
                  </span>
                  <span className="font-mono text-sm text-[#e6e3d9]/50">
                    faviusam@gmail.com
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#e6e3d9]/30">
                    [ GITHUB ]
                  </span>
                  <a href="https://github.com/Favio-coder" className="font-mono text-sm text-[#e6e3d9]/50 hover:text-[#e6e3d9]">
                    github.com/Favio-coder
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#e6e3d9]/30">
                    [ LINKEDIN ]
                  </span>
                  <a href="https://www.linkedin.com/in/favio-asturimac-6b907825b/" className="font-mono text-sm text-[#e6e3d9]/50 hover:text-[#e6e3d9]">
                    linkedin.com/in/favio-asturimac
                  </a>
                </div>
              </div>

              <div className="h-px w-full bg-[#e6e3d9]/10" />

              <div className="mt-6 flex items-center gap-3">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#0ce642]" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#e6e3d9]/40">
                  STATUS:
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#0ce642]">
                  ● AVAILABLE
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

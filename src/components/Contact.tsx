"use client";

export default function Contact() {
  return (
    <section id="contact" className="relative min-h-screen px-6 py-20 md:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#e6e3d9]/40">
            04 / CONTACT
          </p>
        </div>

        {/* Terminal box */}
        <div className="overflow-hidden border border-[#e6e3d9]/10 bg-[#0a0a0a]/80 p-6 md:p-8">
          {/* Terminal title bar */}
          <div className="mb-6 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#e6e3d9]/10" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#e6e3d9]/30">
              FAVIO_OS / CONNECT
            </span>
          </div>

          {/* Command */}
          <div className="mb-6 font-mono text-[10px] text-[#0ce642]/60">
            $ ./connect.sh
          </div>

          {/* Status lines */}
          <div className="space-y-4">
            <div className="font-mono text-xs text-[#e6e3d9]/50">
              INITIALIZING CONNECTION...
            </div>
            <div className="h-px w-full bg-[#e6e3d9]/10" />

            {/* Contact methods */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#e6e3d9]/30">
                  [ EMAIL ]
                </span>
                <span className="font-mono text-sm text-[#e6e3d9]/50">
                  [ADD_EMAIL]
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#e6e3d9]/30">
                  [ GITHUB ]
                </span>
                <span className="font-mono text-sm text-[#e6e3d9]/50">
                  [ADD_GITHUB]
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#e6e3d9]/30">
                  [ LINKEDIN ]
                </span>
                <span className="font-mono text-sm text-[#e6e3d9]/50">
                  [ADD_LINKEDIN]
                </span>
              </div>
            </div>

            <div className="h-px w-full bg-[#e6e3d9]/10" />

            {/* Status */}
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
      </div>
    </section>
  );
}

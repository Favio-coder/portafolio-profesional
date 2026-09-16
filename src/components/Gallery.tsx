"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { gallery } from "@/data/gallery";

export default function Gallery() {
  return (
    <section id="gallery" className="relative min-h-screen px-6 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#e6e3d9]/40">
            03 / GALLERY
          </p>
        </div>

        <div className="mb-8 font-mono text-[10px] text-[#0ce642]/60">
          $ ls ./gallery
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {gallery.map((item, index) => {
            const isTall = index % 3 === 1;
            return (
              <Dialog key={item.id}>
                <DialogTrigger>
                  <div
                    className={`group relative overflow-hidden border border-[#e6e3d9]/10 bg-[#0a0a0a]/80 transition-all duration-500 hover:border-[#e6e3d9]/25 hover:-translate-y-0.5 ${
                      isTall ? "sm:col-span-1" : ""
                    }`}
                    style={isTall ? { minHeight: "400px" } : {}}
                  >
                    <div className="relative overflow-hidden">
                      <div className="flex h-full items-center justify-center bg-[#111]">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#e6e3d9]/10">
                          {item.title}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-[#0a0a0a]/90 p-4 transition-transform duration-300 group-hover:translate-y-0">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#e6e3d9]/60">
                          {item.title}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#0ce642]">
                          → OPEN
                        </span>
                      </div>
                      {item.category && (
                        <span className="mt-1 block font-mono text-[8px] uppercase tracking-wider text-[#e6e3d9]/30">
                          {item.category} · {item.year}
                        </span>
                      )}
                    </div>
                  </div>
                </DialogTrigger>

                <DialogContent className="max-w-4xl bg-[#0a0a0a] border border-[#e6e3d9]/10">
                  <div className="flex items-center justify-center">
                    <div className="flex h-64 w-full items-center justify-center bg-[#111]">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#e6e3d9]/10">
                        {item.title}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#e6e3d9]/60">
                      {item.title}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#0ce642]">
                      {item.category} · {item.year}
                    </span>
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      </div>
    </section>
  );
}

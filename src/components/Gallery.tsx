"use client";

import { motion } from "motion/react";
import Marquee from "@/components/Marquee";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { gallery } from "@/data/gallery";

export default function Gallery() {
  return (
    <section id="gallery" className="relative min-h-[85vh] px-6 py-16 md:px-8 overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="font-mono text-sm uppercase tracking-widest text-[#e6e3d9]/40">
            03 / GALLERY
          </p>
        </div>

        <Marquee speed="slow">
          <span className="font-mono text-base uppercase tracking-[0.3em] text-[#e6e3d9]/10 mx-6">
            GALLERY ✦ GALLERY ✦ GALLERY ✦ GALLERY ✦ GALLERY ✦
          </span>
        </Marquee>

        <div className="mb-8 mt-4 font-mono text-sm text-[#0ce642]/60">
          $ ls ./gallery
        </div>

        <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
          {gallery.map((item, i) => {
            const isTall = i % 2 === 1;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <Dialog key={item.id}>
                  <DialogTrigger>
                    <div
                      className={`group relative overflow-hidden border border-[#e6e3d9]/10 bg-[#0a0a0a]/80 transition-all duration-500 hover:border-[#e6e3d9]/25 hover:-translate-y-0.5 mb-4 ${
                        isTall ? "break-inside-avoid" : ""
                      }`}
                      style={isTall ? { minHeight: "300px" } : {}}
                    >
                      <div className="relative overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={400}
                          height={isTall ? 600 : 400}
                          className="object-cover transition-all duration-500 group-hover:scale-102 w-full"
                          style={{ aspectRatio: isTall ? "3/4" : "4/3" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-[#0a0a0a]/90 p-4 transition-transform duration-300 group-hover:translate-y-0">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-[#e6e3d9]/60">
                            {item.title}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-widest text-[#0ce642]">
                            → OPEN
                          </span>
                        </div>
                        {item.category && (
                          <span className="mt-1 block font-mono text-[9px] uppercase tracking-wider text-[#e6e3d9]/30">
                            {item.category} · {item.year}
                          </span>
                        )}
                      </div>
                    </div>
                  </DialogTrigger>

                  <DialogContent className="max-w-4xl bg-[#0a0a0a] border border-[#e6e3d9]/10">
                    <div className="flex items-center justify-center">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={600}
                        height={400}
                        className="object-cover w-full max-h-[60vh]"
                      />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-mono text-sm uppercase tracking-widest text-[#e6e3d9]/60">
                        {item.title}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#0ce642]">
                        {item.category} · {item.year}
                      </span>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

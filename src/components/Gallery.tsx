"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { gallery } from "@/data/gallery";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionDivider from "@/components/ui/SectionDivider";
import Tag from "@/components/ui/Tag";

export default function Gallery() {
  return (
    <section id="gallery" className="relative px-6 py-20 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          number="04"
          title="GALERÍA"
          subtitle="Colección visual — trabajo, vida, experimentos"
        />

        <SectionDivider className="my-12" label="LS_GALLERY" thick />

        <div className="mb-10 flex flex-wrap gap-2">
          <Tag variant="accent" size="sm">TODOS</Tag>
          {["PERSONAL", "TRABAJO", "OTRO"].map((cat) => (
            <Tag key={cat} variant="outline" size="sm">
              {cat}
            </Tag>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {gallery.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <Dialog>
                <DialogTrigger>
                  <button className="group relative overflow-hidden border border-[var(--border)] bg-[var(--card)] transition-all duration-500 hover:border-[var(--primary)] hover:-translate-y-1 hover:shadow-xl cursor-pointer w-full p-0 text-left">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-[var(--background)]/95 backdrop-blur-sm p-4 transition-transform duration-300 group-hover:translate-y-0">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[0.625rem] uppercase tracking-widest text-[var(--muted-foreground)]">
                          {item.title}
                        </span>
                        <span className="font-mono text-[0.625rem] uppercase tracking-widest text-[var(--primary)]">
                          → VER
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.category && (
                          <Tag variant="outline" size="sm">
                            {item.category}
                          </Tag>
                        )}
                        {item.year && (
                          <Tag variant="default" size="sm">
                            {item.year}
                          </Tag>
                        )}
                      </div>
                    </div>
                  </button>
                </DialogTrigger>

                <DialogContent className="max-w-5xl bg-[var(--card)] border border-[var(--border)] p-0">
                  <div className="relative aspect-[16/10] max-h-[70vh] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="p-6 border-t border-[var(--border)]">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-xl font-semibold text-[var(--foreground)]">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        {item.category && (
                          <Tag variant="outline" size="sm">
                            {item.category}
                          </Tag>
                        )}
                        {item.year && (
                          <Tag variant="primary" size="sm">
                            {item.year}
                          </Tag>
                        )}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
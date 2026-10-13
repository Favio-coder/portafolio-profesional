"use client";
import { imageSizes } from "@/lib/image-assets";


import { useRef, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { gallery } from "@/data/gallery";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionDivider from "@/components/ui/SectionDivider";

const categories = ["TODOS", ...new Set(gallery.flatMap((item) => item.category ? [item.category] : []))];

export default function Gallery() {
  const [category, setCategory] = useState("TODOS");
  const [selected, setSelected] = useState<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const visible = gallery.filter((item) => category === "TODOS" || item.category === category);
  const item = selected === null ? null : visible[selected];
  const move = (direction: number) => setSelected((current) => current === null ? null : (current + direction + visible.length) % visible.length);

  return (
    <section id="gallery" className="gallery-section relative px-4 py-10 sm:px-6 md:py-14 lg:px-12">
      <div className="mx-auto max-w-350">
        <SectionHeading number="04" title="GALERÍA" subtitle="Colección visual — trabajo, vida, experimentos" />
        <SectionDivider className="my-6 md:my-8" label="LS_GALLERY" thick />
        <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Filtrar galería">
          {categories.map((value) => <button key={value} type="button" aria-pressed={category === value} onClick={() => setCategory(value)} className={`px-3 py-1.5 font-mono text-[0.65rem] sm:px-4 sm:py-2 sm:text-xs ${category === value ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>{value}</button>)}
        </div>
        <div className="gallery-grid">
          {visible.map((photo, index) => (
            <button
              key={photo.id}
              type="button"
              className="gallery-file group"
              aria-label={`Ampliar ${photo.title}`}
              onClick={(event) => { opener.current = event.currentTarget; setSelected(index); }}
            >
              <span className="flex justify-between gap-2 px-2 py-2 font-mono text-[0.6rem] sm:gap-3 sm:p-3 sm:text-xs"><span>{photo.id.toUpperCase()}</span><span aria-hidden="true">↗ OPEN</span></span>
              <span className="gallery-image" style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
                <Image src={photo.image} alt={photo.title} fill sizes={imageSizes.gallery} className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.02]" />
              </span>
              <span className="flex flex-wrap justify-between gap-1 px-2 py-2 text-left text-[0.6rem] text-muted-foreground sm:gap-2 sm:p-3 sm:text-xs"><span>{photo.title}</span><span>{photo.category} / {photo.year}</span></span>
            </button>
          ))}
        </div>
        <Dialog open={item !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}>
          <DialogContent className="gallery-lightbox" showCloseButton={false} finalFocus={opener}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
              if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
            }}>
            {item && <>
              <div className="flex items-center justify-between gap-4">
                <DialogTitle>{item.title}</DialogTitle>
                <DialogClose className="lightbox-control" aria-label="Cerrar imagen">Cerrar ×</DialogClose>
              </div>
              <div className="lightbox-image"><Image src={item.image} alt={item.title} fill sizes={imageSizes.lightbox} className="object-contain" /></div>
              <div className="flex items-center justify-between gap-2">
                <button type="button" className="lightbox-control" onClick={() => move(-1)} aria-label="Imagen anterior">←</button>
                <DialogDescription aria-live="polite">{(selected ?? 0) + 1} / {visible.length} · {item.category} · {item.year}</DialogDescription>
                <button type="button" className="lightbox-control" onClick={() => move(1)} aria-label="Imagen siguiente">→</button>
              </div>
            </>}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}


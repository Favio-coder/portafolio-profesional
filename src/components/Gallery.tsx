"use client";
import { imageSizes } from "@/lib/image-assets";


import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { gallery } from "@/data/gallery";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionDivider from "@/components/ui/SectionDivider";
import { useLanguage } from "@/lib/i18n";

export default function Gallery() {
  const { t, lang } = useLanguage();
  const allLabel = t("gallery.all");
  const [category, setCategory] = useState(allLabel);

  // Reset filter to "All" when the language changes so the comparison keeps matching.
  useEffect(() => {
    setCategory(allLabel);
  }, [lang, allLabel]);

  const categories = [allLabel, ...new Set(gallery.flatMap((item) => item.category ? [item.category] : []))];
  const [selected, setSelected] = useState<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const visible = gallery.filter((item) => category === allLabel || item.category === category);
  const item = selected === null ? null : visible[selected];
  const move = (direction: number) => setSelected((current) => current === null ? null : (current + direction + visible.length) % visible.length);

  return (
    <section id="gallery" className="gallery-section relative px-4 py-10 sm:px-6 md:py-14 lg:px-12">
      <div className="mx-auto max-w-350">
        <SectionHeading number="04" title={t("gallery.title")} subtitle={t("gallery.subtitle")} />
        <SectionDivider className="my-6 md:my-8" label="LS_GALLERY" thick />
        <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label={t("gallery.filterAria")}>
          {categories.map((value) => <button key={value} type="button" aria-pressed={category === value} onClick={() => setCategory(value)} className={`px-3 py-1.5 font-mono text-[0.65rem] sm:px-4 sm:py-2 sm:text-xs ${category === value ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>{value}</button>)}
        </div>
        <div className="gallery-grid">
          {visible.map((photo, index) => {
            const title = photo.title.replace("Sesión Fotográfica", t("gallery.photoSession"));
            const categoryLabel = t(`gallery.category.${photo.category?.toLowerCase()}`) ?? photo.category;
            return (
              <button
                key={photo.id}
                type="button"
                className="gallery-file group"
                aria-label={t("gallery.expandImage", { title })}
                onClick={(event) => { opener.current = event.currentTarget; setSelected(index); }}
              >
                <span className="flex justify-between gap-2 px-2 py-2 font-mono text-[0.6rem] sm:gap-3 sm:p-3 sm:text-xs"><span>{photo.id.toUpperCase()}</span><span aria-hidden="true">↗ OPEN</span></span>
                <span className="gallery-image" style={{ aspectRatio: `${photo.width} / ${photo.height}` }}>
                  <Image src={photo.image} alt={title} fill sizes={imageSizes.gallery} className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.02]" />
                </span>
                <span className="flex flex-wrap justify-between gap-1 px-2 py-2 text-left text-[0.6rem] text-muted-foreground sm:gap-2 sm:p-3 sm:text-xs"><span>{title}</span><span>{categoryLabel} / {photo.year}</span></span>
              </button>
            );
          })}
        </div>
        <Dialog open={item !== null} onOpenChange={(open) => { if (!open) setSelected(null); }}>
          <DialogContent className="gallery-lightbox" showCloseButton={false} finalFocus={opener}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
              if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
            }}>
            {item && <>
              <div className="flex items-center justify-between gap-4">
                <DialogTitle>{item.title.replace("Sesión Fotográfica", t("gallery.photoSession"))}</DialogTitle>
                <DialogClose className="lightbox-control" aria-label={t("gallery.closeImage")}>{t("gallery.closeImage")} ×</DialogClose>
              </div>
              <div className="lightbox-image"><Image src={item.image} alt={item.title} fill sizes={imageSizes.lightbox} className="object-contain" /></div>
              <div className="flex items-center justify-between gap-2">
                <button type="button" className="lightbox-control" onClick={() => move(-1)} aria-label={t("gallery.prevImage")}>←</button>
                <DialogDescription aria-live="polite">{(selected ?? 0) + 1} / {visible.length} · {t(`gallery.category.${item.category?.toLowerCase()}`) ?? item.category} · {item.year}</DialogDescription>
                <button type="button" className="lightbox-control" onClick={() => move(1)} aria-label={t("gallery.nextImage")}>→</button>
              </div>
            </>}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}


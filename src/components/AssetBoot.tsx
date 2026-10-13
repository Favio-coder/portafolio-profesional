"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { preloadImages, type LoadProgress } from "@/lib/image-preload";
import type { BootAsset } from "@/lib/image-assets";

export default function AssetBoot({ assets, children }: { assets: BootAsset[]; children: ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [progress, setProgress] = useState<LoadProgress>({ completed: 0, loaded: 0, failed: 0, total: assets.length, label: "INITIALIZING…" });
  const continueButton = useRef<HTMLButtonElement>(null);
  const percent = progress.total ? Math.floor(progress.completed / progress.total * 100) : 100;

  useEffect(() => {
    const controller = new AbortController();
    let closeTimer: ReturnType<typeof setTimeout>;
    // Limit time blocking the visitor; remaining assets continue in background.
    const deadline = setTimeout(() => setVisible(false), 12000);
    const initialize = setTimeout(() => {
      setHydrated(true);
      continueButton.current?.focus({ preventScroll: true });
      const ordered = location.pathname.startsWith("/cuaderno")
        ? [...assets].sort((a, b) => Number(b.group === "evidence") - Number(a.group === "evidence"))
        : assets;
      void preloadImages(ordered, setProgress, controller.signal).then(() => {
        if (controller.signal.aborted) return;
        clearTimeout(deadline);
        closeTimer = setTimeout(() => setVisible(false), 250);
      });
    }, 0);
    return () => { controller.abort(); clearTimeout(initialize); clearTimeout(deadline); clearTimeout(closeTimer); };
  }, [assets]);

  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [visible]);

  return <>
    <div className="asset-boot-content flex min-h-full flex-1 flex-col" inert={hydrated && visible ? true : undefined}>{children}</div>
    {visible && <div className="asset-boot-screen fixed inset-0 z-[200] grid place-items-center bg-background p-6" role="dialog" aria-modal="true" aria-label="Cargando el portafolio" onKeyDown={(event) => { if (event.key === "Escape") setVisible(false); }}>
      <div className="w-full max-w-lg overflow-hidden border border-border bg-card font-mono">
        <div className="flex items-center justify-between border-b border-border bg-muted/50 px-5 py-3 text-xs tracking-widest"><span className="text-primary-ink">FAVIO_OS</span><span className="text-muted-foreground">BOOT / 01</span></div>
        <div className="space-y-6 p-5 sm:p-8">
          <p className="text-sm text-primary-ink">$ load ./portfolio --cache</p>
          <div className="flex items-end justify-between gap-4"><p className="text-xs uppercase tracking-widest text-muted-foreground">{percent === 100 ? "SYSTEM READY" : "LOADING ASSETS…"}</p><span className="text-4xl tabular-nums text-foreground">{percent}<span className="text-lg text-muted-foreground">%</span></span></div>
          <div role="progressbar" aria-label="Imágenes procesadas" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} aria-valuetext={`${progress.loaded} cargadas, ${progress.failed} no disponibles, ${progress.total} en total`} className="h-5 border border-border bg-background p-1"><div className="boot-progress h-full bg-primary" style={{ width: `${percent}%` }} /></div>
          <div className="space-y-2 text-xs text-muted-foreground"><p className="truncate">&gt; {progress.label}</p><p>{progress.loaded} IMÁGENES LISTAS / {progress.total} RECURSOS</p>{progress.failed > 0 && <p>{progress.failed} no disponibles · continuamos con el resto</p>}</div>
          <button ref={continueButton} type="button" onClick={() => setVisible(false)} className="border border-border px-4 py-2 text-xs text-foreground transition-colors hover:border-primary focus-visible:outline-2 focus-visible:outline-primary">Entrar ahora →</button>
        </div>
      </div>
    </div>}
    <noscript><style>{".asset-boot-screen { display: none !important; }"}</style></noscript>
  </>;
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Music2, X, ExternalLink } from "lucide-react";

const playlist = "https://open.spotify.com/playlist/42KtFWWUPrWyPd88MHAbm0";

export default function SpotifyPlayer() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [docked, setDocked] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  function close() {
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
  }

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;
    // Reserve an inline dock when contact is visible; keep its actions unobscured.
    const observer = new IntersectionObserver(([entry]) => setDocked(entry.isIntersecting), { rootMargin: "0px 0px 80px 0px" });
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !event.defaultPrevented) {
        setOpen(false);
        trigger.current?.focus({ preventScroll: true });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="spotify-dock" data-docked={docked}>
      <div className="spotify-widget">
        <section id="spotify-panel" hidden={!open} aria-label="Reproductor de Spotify" className="spotify-panel border border-border bg-card p-3 shadow-2xl" data-lenis-prevent>
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="font-mono text-xs tracking-wider">FAVIO_OS / SOUNDTRACK</span>
            <button ref={closeButton} type="button" onClick={close} aria-label="Cerrar Spotify" className="spotify-control"><X size={18} aria-hidden="true" /></button>
          </div>
          {loaded && <iframe title="Playlist de Favio en Spotify" src="https://open.spotify.com/embed/playlist/42KtFWWUPrWyPd88MHAbm0" width="100%" height="152" allow="encrypted-media; fullscreen; picture-in-picture" className="block rounded-lg border-0" />}
          <a href={playlist} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center gap-2 font-mono text-xs text-primary">Abrir en Spotify<ExternalLink size={14} aria-hidden="true" /><span className="sr-only"> (nueva pestaña)</span></a>
        </section>
        <button ref={trigger} type="button" onClick={() => { if (open) close(); else { setLoaded(true); setOpen(true); } }} aria-expanded={open} aria-controls="spotify-panel" aria-label={open ? "Ocultar Spotify" : "Abrir Spotify"} className="spotify-trigger flex size-14 items-center justify-center rounded-full border border-border bg-card text-primary shadow-lg"><Music2 size={23} aria-hidden="true" /></button>
      </div>
    </div>
  );
}

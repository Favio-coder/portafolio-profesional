"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import Reveal from "@/components/Reveal";
import Tracks from "@/components/Tracks";
import { tracks } from "@/data/tracks";

export default function TechnicalTracks() {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { margin: "0px" });

  return (
    <section ref={ref} id="tracks" aria-labelledby="tracks-title" className="technical-tracks relative isolate overflow-hidden px-4 py-20 sm:px-6 lg:px-12" data-active={visible}>
      <div className="tracks-backdrop pointer-events-none absolute inset-0 -z-10 flex flex-col justify-between py-6" aria-hidden="true">
        <Tracks triggerOnce={false} bands={[
          { text: "BUILD ✦ EXPLORE ✦ DEPLOY ✦", speed: 65, fontSize: "clamp(5rem, 15vw, 14rem)" },
          { text: "TRACKS ✦ FAVIO_OS ✦", speed: 80, fontSize: "clamp(5rem, 15vw, 14rem)" },
        ]} />
      </div>
      <div className="mx-auto max-w-350">
        <Reveal className="mb-12 max-w-3xl">
          <p className="section-num">FAVIO_OS / TRACKS</p>
          <h2 id="tracks-title" className="section-title mt-4">Tres tracks.<br /><span className="text-primary">Una misma curiosidad.</span></h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3 lg:gap-6">
          {tracks.map((track, index) => (
            <Reveal key={track.number} delay={index * 0.1} className="h-full">
              <article className="track-card relative flex h-full flex-col overflow-hidden border border-border bg-card p-6 sm:p-8">
                <div className="mb-10 flex items-start justify-between gap-4" aria-hidden="true">
                  <span className="track-number font-heading text-7xl font-bold leading-none tracking-tighter text-muted-foreground">{track.number}</span>
                  <track.icon className="size-6 text-primary" />
                </div>
                <h3 className="font-heading text-2xl font-bold leading-tight">{track.title}</h3>
                <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">{track.description}</p>
                <p className="mt-10 flex items-center justify-between font-mono text-xs text-primary" aria-hidden="true"><span>$ {track.command}</span><span>↗</span></p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

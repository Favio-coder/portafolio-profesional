"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const statement = "La curiosidad inicia el camino. Construir lo convierte en realidad.";

export default function AnimatedStatement() {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref);
  const reduced = useReducedMotion();

  return (
    <section ref={ref} className="statement-section relative isolate overflow-hidden border-y border-border px-4 py-24 sm:px-6 md:py-36 lg:px-12" data-active={visible} aria-labelledby="statement-title">
      <div className="statement-orbit pointer-events-none absolute -z-10" aria-hidden="true" />
      <div className="mx-auto max-w-350">
        <p className="section-num mb-10" aria-hidden="true">$ curiosity --build-reality</p>
        <h2 id="statement-title" className="statement-title font-heading font-bold uppercase">
          <span className="sr-only">{statement}</span>
          <motion.span aria-hidden="true" className="block" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.25 }} transition={{ staggerChildren: reduced ? 0 : 0.055 }}>
            {statement.split(" ").map((word, index) => (
              <span key={index} className="inline-block overflow-hidden align-top"><motion.span className={`inline-block ${index >= 5 ? "text-primary" : ""}`} variants={{ hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : "100%" }, visible: { opacity: 1, y: 0 } }} transition={{ duration: reduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}>{word}</motion.span><span> </span></span>
            ))}
          </motion.span>
        </h2>
        <div className="mt-12 flex items-center gap-4 font-mono text-xs text-muted-foreground" aria-hidden="true"><span className="h-px w-16 bg-primary" />FAVIO.DEV / ALWAYS BUILDING</div>
      </div>
    </section>
  );
}

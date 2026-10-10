"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Download } from "lucide-react";

export default function Hero() {
  const [isPixel, setIsPixel] = useState(false);
  const [transitionText, setTransitionText] = useState("");
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => {
      setIsPixel((current) => !current);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cleanup: ReturnType<typeof setTimeout>;
    const timer = setTimeout(() => {
      setTransitionText(isPixel ? "SWITCHING_RENDER_MODE..." : "RESTORING_IMAGE...");
      cleanup = setTimeout(() => setTransitionText(""), 1500);
    }, 50);
    return () => { clearTimeout(timer); clearTimeout(cleanup); };
  }, [isPixel]);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen px-6 pt-20 pb-16 md:px-8 lg:px-12">
      <div className="mx-auto max-w-350">
        <div className="mb-12 flex items-center justify-between">
          <div className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
            <span className="text-primary-ink">FAVIO.DEV</span>
            <span className="mx-2">/</span>
            <span>HOME</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-sm">
            <span className="relative flex h-2 w-2 items-center">
              <span className={`absolute h-2 w-2 rounded-full bg-primary ${hasScrolled ? "animate-pulse" : ""}`} />
            </span>
            <span className="text-muted-foreground uppercase tracking-wider">
              {hasScrolled ? "SCROLLING" : "READY"}
            </span>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] items-start">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3">
                <span className="terminal-prompt">$</span>
                <span className="text-muted-foreground">whoami</span>
              </div>

              <motion.h1
                className="font-heading font-black uppercase tracking-tight text-foreground leading-[0.95]"
                style={{
                  fontSize: "clamp(3.5rem, 10vw, 8.5rem)",
                  lineHeight: "clamp(3.5rem, 10vw, 8.5rem)",
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="block">FAVIO</span>
                <span className="block text-muted-foreground">ASTURIMAC</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-3 text-sm font-mono uppercase tracking-wider"
              >
                <span className="badge badge-primary">FULL STACK</span>
                <span className="badge badge-accent">CLOUD</span>
                <span className="badge">DATA ENG</span>
                <span className="badge">AI / ML</span>
              </motion.div>

              <motion.p
                className="max-w-md text-base leading-relaxed text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                Desarrollo soluciones digitales integrando software, cloud, datos e inteligencia artificial.
                Enfoque en productos funcionales, escalables y orientados a resolver problemas reales.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-4"
              >
                <button
                  type="button"
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="group inline-flex items-center gap-2 px-6 py-3 font-mono text-sm uppercase tracking-wider text-accent-foreground bg-accent rounded-sm transition-all duration-300 hover:shadow-[0_8px_30px_rgba(255,99,62,0.4)] hover:-translate-y-0.5"
                >
                  Ver Proyectos
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="inline-flex items-center gap-2 px-6 py-3 font-mono text-sm uppercase tracking-wider text-foreground border border-border rounded-sm hover:bg-muted transition-all duration-300"
                >
                  <Download className="size-4" aria-hidden="true" />
                  Contacto
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-4 font-mono text-xs uppercase tracking-wider text-muted-foreground"
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                  </span>
                  <span>DISPONIBLE PARA PROYECTOS</span>
                </div>
                <div className="hidden md:flex items-center gap-1 px-3 py-1 bg-muted rounded-full">
                  <span className="text-primary-ink">●</span>
                  <span>ONLINE</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-md mx-auto lg:mx-0"
              style={{ aspectRatio: "3/4" }}
            >
              <div className="relative w-full h-full overflow-hidden border border-border bg-muted">
                <Image
                  src="/assets/images/FavioAsturimac.png"
                  alt="Favio Asturimac - Full Stack Developer"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                  className={`object-cover transition-all duration-1000 ease-out ${
                    isPixel ? "scale-105 opacity-0" : "scale-100 opacity-100"
                  }`}
                />
                <Image
                  src="/assets/images/PixelFavio.png"
                  alt="Favio Asturimac - Pixel Art Version"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                  className={`object-cover transition-all duration-1000 ease-out ${
                    isPixel ? "scale-100 opacity-100" : "scale-95 opacity-0"
                  }`}
                />
                <div className="absolute inset-0 bg-linear-to- from-background/60 via-transparent to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="font-mono text-[0.625rem] uppercase tracking-widest text-foreground/60">
                    IMG_001 / FAVIO_ASTURIMAC
                  </div>
                  <div className="font-mono text-[0.625rem] uppercase tracking-widest text-primary-ink">
                    {isPixel ? "PIXEL_MODE" : "PORTRAIT_MODE"}
                  </div>
                </div>
              </div>

              <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 font-mono text-[0.625rem] uppercase tracking-widest text-primary-ink transition-all duration-500 ${
                  transitionText ? "opacity-100" : "opacity-0"
                }`}
                aria-live="polite"
                aria-atomic="true"
              >
                {transitionText || (
                  <>
                    <span className="inline-block animate-pulse">PROCESSING_IMAGE...</span>
                  </>
                )}
              </div>

              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-6 font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground">
                <span>{isPixel ? "8BIT_RENDER" : "HIGH_RES"}</span>
                <span className="text-border">|</span>
                <span>FRAME_{isPixel ? "001" : "002"}</span>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground"
        >
          <span>SCROLL TO EXPLORE</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-6 bg-muted-foreground"
            aria-hidden="true"
          />
        </motion.div>
      </div>
    </section>
  );
}

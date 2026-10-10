"use client";

import { useEffect, useRef, useState } from "react";

interface TracksProps {
  bands: Array<{
    text: string;
    direction?: "left" | "right";
    speed?: number;
    color?: string;
    fontSize?: string;
    weight?: number;
  }>;
  className?: string;
  triggerOnce?: boolean;
}

export default function Tracks({
  bands,
  className = "",
  triggerOnce = true,
}: TracksProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { rootMargin: "100px", threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [triggerOnce]);

  if (bands.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none ${className}`}
      aria-hidden="true"
      role="img"
      aria-label="Bandas decorativas tipográficas animadas"
    >
      <div className="flex flex-col gap-4">
        {bands.map((band, bandIndex) => {
          const {
            text,
            direction = bandIndex % 2 === 0 ? "left" : "right",
            speed = 30 + bandIndex * 5,
            color = "var(--muted-foreground)",
            fontSize = "clamp(2rem, 6vw, 4.5rem)",
            weight = 700,
          } = band;

          const words = text.split(" ").filter(Boolean);
          const duplicatedWords = [...words, ...words];

          const animationClass = direction === "left" ? "animate-marquee" : "animate-marquee-reverse";

          return (
            <div
              key={bandIndex}
              className="relative"
              style={{
                fontSize,
                color,
                fontWeight: weight,
                fontFamily: "var(--font-heading)",
              }}
            >
              <div
                className={`flex whitespace-nowrap will-change-transform items-center gap-6 ${isVisible ? animationClass : ""}`}
                style={{
                  animationDuration: `${speed}s`,
                }}
              >
                {duplicatedWords.map((word, i) => (
                  <span key={i} className="flex items-center gap-6 uppercase tracking-tight">
                    {word}
                    {i < words.length - 1 && <span className="opacity-30">✦</span>}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
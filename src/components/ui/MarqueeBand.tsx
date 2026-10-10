"use client";

import { useEffect, useRef, useState } from "react";

interface MarqueeBandProps {
  items: string[];
  direction?: "left" | "right";
  speed?: number;
  fontSize?: string;
  color?: string;
  className?: string;
  paused?: boolean;
}

export default function MarqueeBand({
  items,
  direction = "left",
  speed = 40,
  fontSize = "clamp(2.5rem, 8vw, 6rem)",
  color = "var(--muted-foreground)",
  className = "",
  paused = false,
}: MarqueeBandProps) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "100px", threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const duplicatedItems = [...items, ...items];

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none ${className}`}
      aria-hidden="true"
      style={{ fontSize, color }}
    >
      <div
        ref={contentRef}
        className="flex whitespace-nowrap will-change-transform"
        style={{
          animation: isVisible && !paused
            ? `${direction === "left" ? "marquee" : "marquee-reverse"} ${speed}s linear infinite`
            : "none",
          transform: isVisible ? undefined : "translateX(0)",
        }}
      >
        {duplicatedItems.map((item, i) => (
          <span key={i} className="flex items-center gap-4 px-4 font-heading font-black uppercase tracking-tighter">
            {item}
          </span>
        ))}
      </div>
      <style jsx global>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
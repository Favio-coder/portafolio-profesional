"use client";

import { useMemo } from "react";
import { Children, cloneElement, isValidElement } from "react";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
  className?: string;
  paused?: boolean;
  fadeEdges?: boolean;
}

const DEFAULT_SPEED = 40;

export default function Marquee({
  children,
  direction = "left",
  speed = DEFAULT_SPEED,
  className = "",
  paused = false,
  fadeEdges = true,
}: MarqueeProps) {
  const isReverse = direction === "right";

  const duplicated = useMemo(() => {
    const childrenArray = Children.toArray(children);
    const arr = childrenArray.map((child, i) =>
      isValidElement(child)
        ? cloneElement(child, { key: `marquee-${i}-0` })
        : child
    );
    const dupArr = childrenArray.map((child, i) =>
      isValidElement(child)
        ? cloneElement(child, { key: `marquee-${i}-1` })
        : child
    );
    return [...arr, ...dupArr];
  }, [children]);

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        WebkitMaskImage: fadeEdges
          ? "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
          : undefined,
        maskImage: fadeEdges
          ? "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
          : undefined,
      }}
      aria-hidden="true"
    >
      <div
        className={`flex whitespace-nowrap will-change-transform ${isReverse ? "flex-row-reverse" : "flex-row"}`}
        style={{
          animation: paused
            ? "none"
            : `${isReverse ? "marquee-reverse" : "marquee"} ${speed}s linear infinite`,
        }}
      >
        {duplicated}
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
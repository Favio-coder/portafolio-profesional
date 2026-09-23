"use client";

import { useMemo } from "react";
import { Children, cloneElement } from "react";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

const speedMap = {
  slow: "40s",
  normal: "25s",
  fast: "12s",
};

export default function Marquee({
  children,
  direction = "left",
  speed = "normal",
  className = "",
}: MarqueeProps) {
  const isReverse = direction === "right";
  const duration = speedMap[speed];
  const animationName = isReverse ? "marqueeReverse" : "marquee";

  const duplicated = useMemo(() => {
    const arr = Children.toArray(children).map((child, i) =>
      cloneElement(child as React.ReactElement, { key: `marquee-${i}-0` })
    );
    const dupArr = Children.toArray(children).map((child, i) =>
      cloneElement(child as React.ReactElement, { key: `marquee-${i}-1` })
    );
    return [...arr, ...dupArr];
  }, [children]);

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        className={`flex whitespace-nowrap ${
          isReverse ? "flex-row-reverse" : "flex-row"
        }`}
        style={{
          animation: `${animationName} ${duration} linear infinite`,
        }}
      >
        {duplicated}
      </div>
    </div>
  );
}

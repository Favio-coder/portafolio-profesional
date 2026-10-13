"use client";

import { useState, useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ReactNode } from "react";

interface TerminalLabelProps {
  children: ReactNode;
  prompt?: string;
  variant?: "default" | "success" | "warning" | "error" | "info";
  className?: string;
  animated?: boolean;
}

function TypewriterText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState("");
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref);
  const reduced = useReducedMotion();
  const index = useRef(0);
  const isComplete = reduced || displayText.length >= text.length;

  useEffect(() => {
    if (!visible || reduced || index.current >= text.length) return;
    const timer = setInterval(() => {
      index.current += 1;
      setDisplayText(text.slice(0, index.current));
      if (index.current >= text.length) clearInterval(timer);
    }, 30);

    return () => clearInterval(timer);
  }, [text, visible, reduced]);

  return (
    <span ref={ref} className="relative inline-block">
      <span className="invisible" aria-hidden="true">{text}</span>
      <span className="sr-only">{text}</span>
      <span className="absolute inset-0" aria-hidden="true">{reduced ? text : displayText}
      {!isComplete && <span className="ml-1">█</span>}
      </span>
    </span>
  );
}

export default function TerminalLabel({
  children,
  prompt = "$",
  variant = "default",
  className = "",
  animated = false,
}: TerminalLabelProps) {
  const variantColors = {
    default: "text-primary-ink",
    success: "text-primary-ink",
    warning: "text-amber-500",
    error: "text-red-500",
    info: "text-sky-500",
  };

  return (
    <div className={`font-mono text-sm ${className}`}>
      <span className={`font-medium ${variantColors[variant]}`} aria-hidden="true">
        {prompt}
      </span>
      <span className="ml-2 text-foreground">
        {typeof children === "string" && animated ? (
          <TypewriterText text={children} />
        ) : (
          children
        )}
      </span>
    </div>
  );
}

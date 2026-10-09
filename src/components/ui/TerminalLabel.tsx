"use client";

import { useState, useEffect } from "react";
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
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span>
      {displayText}
      {!isComplete && <span className="animate-pulse ml-1">█</span>}
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
    default: "text-[var(--primary)]",
    success: "text-[var(--primary)]",
    warning: "text-amber-500",
    error: "text-red-500",
    info: "text-sky-500",
  };

  return (
    <div className={`font-mono text-sm ${className}`}>
      <span className={`font-medium ${variantColors[variant]}`} aria-hidden="true">
        {prompt}
      </span>
      <span className="ml-2 text-[var(--foreground)]">
        {typeof children === "string" && animated ? (
          <TypewriterText text={children} />
        ) : (
          children
        )}
      </span>
    </div>
  );
}
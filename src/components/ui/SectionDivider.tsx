"use client";

import { ReactNode } from "react";

interface SectionDividerProps {
  className?: string;
  thick?: boolean;
  label?: ReactNode;
  labelPosition?: "left" | "center" | "right";
}

export default function SectionDivider({
  className = "",
  thick = false,
  label,
  labelPosition = "center",
}: SectionDividerProps) {
  const alignClasses = {
    left: "items-start justify-start",
    center: "items-center justify-center",
    right: "items-end justify-end",
  };

  if (label) {
    return (
      <div className={`flex gap-4 ${alignClasses[labelPosition]} ${className}`}>
        <div className={`flex-1 h-px bg-border ${thick ? "h-0.75 rounded-full" : ""}`} />
        <span className="font-mono text-[0.625rem] uppercase tracking-widest text-muted-foreground whitespace-nowrap shrink-0">
          {label}
        </span>
        <div className={`flex-1 h-px bg-border ${thick ? "h-0.75 rounded-full" : ""}`} />
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div className={`h-px bg-border ${thick ? "h-0.75 rounded-full" : ""}`} />
    </div>
  );
}
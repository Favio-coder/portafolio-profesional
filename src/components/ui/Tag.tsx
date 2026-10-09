"use client";

import { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  variant?: "default" | "accent" | "primary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  as?: "span" | "div";
}

export default function Tag({
  children,
  variant = "default",
  size = "md",
  className = "",
  as: Component = "span",
}: TagProps) {
  const baseStyles = "inline-flex items-center font-mono uppercase tracking-wider transition-all duration-200";
  
  const variants = {
    default: "bg-[var(--muted)] text-[var(--muted-foreground)] border border-[var(--border)]",
    accent: "bg-transparent text-[var(--accent)] border border-[var(--accent)]",
    primary: "bg-transparent text-[var(--primary)] border border-[var(--primary)]",
    outline: "bg-transparent text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--foreground)] hover:text-[var(--foreground)]",
  };

  const sizes = {
    sm: "text-[0.55rem] px-2 py-0.5",
    md: "text-[0.625rem] px-2.5 py-1",
    lg: "text-[0.75rem] px-3 py-1.5",
  };

  return (
    <Component
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} rounded-full ${className}`}
    >
      {children}
    </Component>
  );
}
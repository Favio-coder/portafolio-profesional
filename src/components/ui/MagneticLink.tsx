"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface MagneticLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  strength?: number;
  target?: string;
  rel?: string;
}

export default function MagneticLink({
  children,
  href,
  className = "",
  strength = 0.3,
  target,
  rel,
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 400, damping: 30 });
  const springY = useSpring(y, { stiffness: 400, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {};

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className={`inline-flex items-center group ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        x: springX,
        y: springY,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {children}
    </motion.a>
  );
}
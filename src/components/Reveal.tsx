"use client";

import { motion, useReducedMotion } from "motion/react";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

const directionMap = {
  up: { y: 30, x: 0 },
  down: { y: -30, x: 0 },
  left: { y: 0, x: -20 },
  right: { y: 0, x: 20 },
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.6,
}: RevealProps) {
  const { y, x } = directionMap[direction];
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : y, x: reduced ? 0 : x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: "some" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface RevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  splitBy?: "lines" | "words" | "chars";
  stagger?: number;
  as?: "p" | "h1" | "h2" | "h3" | "span" | "div";
}

const MotionComponents = {
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  span: motion.span,
  div: motion.div,
} as const;

export default function RevealText({
  children,
  className = "",
  delay = 0,
  duration = 0.7,
  splitBy = "lines",
  stagger = 0.05,
  as = "p",
}: RevealTextProps) {
  const text = typeof children === "string" ? children : "";
  const nodes = typeof children === "string" ? null : children;
  const MotionComponent = MotionComponents[as];

  if (splitBy === "lines" && text) {
    const lines = text.split("\n").filter((l) => l.trim());
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: stagger, delayChildren: delay },
          },
        }}
      >
        {lines.map((line, i) => (
          <motion.span
            key={i}
            className="block"
            variants={{
              hidden: { opacity: 0, y: "100%" },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {line}
            <br />
          </motion.span>
        ))}
      </motion.div>
    );
  }

  if (splitBy === "words" && text) {
    const words = text.split(" ");
    return (
      <MotionComponent
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: stagger, delayChildren: delay },
          },
        }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: "100%" },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration, ease: [0.16, 1, 0.3, 1] },
              },
            }}
          >
            {word}
            {" "}
          </motion.span>
        ))}
      </MotionComponent>
    );
  }

  return (
    <MotionComponent
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {nodes ?? text}
    </MotionComponent>
  );
}
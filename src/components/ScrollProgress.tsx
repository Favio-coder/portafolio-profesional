"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setProgress(Math.min(Math.max(scrollPercent, 0), 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 h-1 w-full bg-transparent pointer-events-none"
      style={{ background: "linear-gradient(to right, var(--primary), var(--accent))" }}
      aria-hidden="true"
    >
      <motion.div
        className="h-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress }}
        style={{ transformOrigin: "left center" }}
        transition={{ duration: 0.1, ease: "linear" }}
      />
    </motion.div>
  );
}
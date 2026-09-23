"use client";

import { motion } from "motion/react";
import Reveal from "@/components/Reveal";

const stackItems = [
  { label: "React", delay: 0.1 },
  { label: "Next.js", delay: 0.2 },
  { label: "TypeScript", delay: 0.3 },
  { label: "Tailwind CSS", delay: 0.4 },
  { label: "GSAP / Motion", delay: 0.5 },
  { label: "Node.js", delay: 0.6 },
  { label: "Spring Boot", delay: 0.7 },
  { label: "Laravel", delay: 0.8 },
  { label: "AWS", delay: 0.9 },
  { label: "Google Cloud", delay: 1.0 },
  { label: "TensorFlow", delay: 1.1 },
  { label: "Rasa / NLP", delay: 1.2 },
];

export default function Stack() {
  return (
    <section id="stack" className="relative py-16 px-6 md:px-8">
      <div className="mx-auto max-w-5xl">
        <Reveal delay={0.1}>
          <div className="mb-12">
            <p className="font-mono text-sm uppercase tracking-widest text-[#e6e3d9]/40">
              05 / STACK
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mb-8 font-mono text-sm text-[#0ce642]/60">
            $ my --stack
          </div>
        </Reveal>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-[#e6e3d9]/10" />

          <div className="space-y-6">
            {stackItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: item.delay }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative flex items-center gap-4 pl-10"
              >
                <div className="absolute left-[calc(4rem-5px)] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#0ce642]" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#e6e3d9]/30 w-12">
                  {i + 1}
                </span>
                <span className="font-mono text-sm uppercase tracking-wider text-[#e6e3d9]/70">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

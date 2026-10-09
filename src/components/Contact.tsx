"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionDivider from "@/components/ui/SectionDivider";
import TerminalLabel from "@/components/ui/TerminalLabel";
import { Mail, GitBranch, Link2, ExternalLink, Copy } from "lucide-react";
import { useState } from "react";

const contacts = [
  {
    id: "email",
    label: "EMAIL",
    value: "faviusam@gmail.com",
    href: "mailto:faviusam@gmail.com",
    icon: Mail,
    copyable: true,
  },
  {
    id: "github",
    label: "GITHUB",
    value: "github.com/Favio-coder",
    href: "https://github.com/Favio-coder",
    icon: GitBranch,
    external: true,
  },
  {
    id: "linkedin",
    label: "LINKEDIN",
    value: "linkedin.com/in/favio-asturimac",
    href: "https://www.linkedin.com/in/favio-asturimac-6b907825b/",
    icon: Link2,
    external: true,
  },
];

export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="contact" className="relative px-6 py-20 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          number="05"
          title="CONTACTO"
          subtitle="Conectemos y construyamos algo juntos"
        />

        <SectionDivider className="my-12" label="CONNECT.SH" thick />

        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="overflow-hidden border border-[var(--border)] bg-[var(--card)] p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]" />
                <TerminalLabel prompt="$" variant="default" className="text-sm">
                  ./connect.sh
                </TerminalLabel>
              </div>

              <div className="mb-6 font-mono text-sm text-[var(--muted-foreground)]">
                INITIALIZING CONNECTION...
              </div>

              <SectionDivider />

              <div className="mt-6 space-y-6">
                {contacts.map((contact, i) => (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex items-center gap-4 p-4 bg-[var(--muted)] rounded-sm transition-all hover:bg-[var(--secondary)]"
                  >
                    <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-[var(--background)] border border-[var(--border)] rounded-sm text-[var(--primary)] group-hover:border-[var(--primary)] group-hover:text-[var(--accent)] transition-all">
                      <contact.icon className="size-5" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[0.625rem] uppercase tracking-widest text-[var(--muted-foreground)]">
                        [{contact.label}]
                      </p>
                      <a
                        href={contact.href}
                        target={contact.external ? "_blank" : undefined}
                        rel={contact.external ? "noopener noreferrer" : undefined}
                        className="flex items-center gap-2 font-medium text-[var(--foreground)] hover:text-[var(--accent)] transition-colors truncate"
                      >
                        {contact.value}
                        {contact.external && (
                          <ExternalLink className="size-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                        )}
                      </a>
                    </div>
                    {contact.copyable && (
                      <button
                        onClick={() => handleCopy(contact.value, contact.id)}
                        className="shrink-0 p-2 text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
                        aria-label={copied === contact.id ? "Copiado" : "Copiar email"}
                      >
                        {copied === contact.id ? (
                          <Copy className="size-5 text-[var(--primary)]" aria-hidden="true" />
                        ) : (
                          <Copy className="size-5" aria-hidden="true" />
                        )}
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>

              <SectionDivider />

              <div className="mt-6 flex items-center gap-4">
                <span className="relative flex h-2 w-2">
                  <span className="absolute h-2 w-2 rounded-full bg-[var(--primary)] animate-pulse" />
                </span>
                <TerminalLabel prompt="" variant="success" className="text-sm font-mono uppercase tracking-wider">
                  STATUS: AVAILABLE FOR NEW PROJECTS
                </TerminalLabel>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border border-[var(--border)] bg-[var(--card)] p-6 md:p-8"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                  CTA_BLOCK
                </span>
              </div>

              <h3 className="font-heading font-black uppercase tracking-tight text-[var(--foreground)] mb-4" style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)" }}>
                CONSTRUYAMOS<br />ALGO JUNTOS.
              </h3>

              <p className="text-[var(--muted-foreground)] leading-relaxed mb-6 max-w-md">
                ¿Tienes un proyecto en mente? ¿Necesitas ayuda con arquitectura cloud, pipelines de datos o desarrollo full stack? Hablemos.
              </p>

              <a
                href="mailto:faviusam@gmail.com?subject=Proyecto:%20[Nombre]&body=Hola%20Favio,%0A%0AMe%20gustar%C3%ADa%20conversar%20sobre..."
                className="inline-flex items-center gap-2 px-6 py-3 font-mono text-sm uppercase tracking-wider text-[var(--accent-foreground)] bg-[var(--accent)] rounded-sm hover:shadow-[0_8px_30px_rgba(255,99,62,0.4)] hover:-translate-y-0.5 transition-all duration-300"
              >
                Enviar Email
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="overflow-hidden border border-[var(--border)] bg-[var(--card)] p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                  DISPONIBILIDAD
                </span>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Freelance / Contract", status: "Abierto", color: "var(--primary)" },
                  { label: "Full-time Remote", status: "Abierto", color: "var(--primary)" },
                  { label: "Consultoría Técnica", status: "Abierto", color: "var(--primary)" },
                  { label: "Mentorías / Charlas", status: "Consultar", color: "var(--accent)" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-[var(--muted)] rounded-sm">
                    <span className="font-mono text-sm text-[var(--foreground)]">{item.label}</span>
                    <span className="badge" style={{ borderColor: item.color, color: item.color }}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden border border-[var(--border)] bg-[var(--card)] p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                  UBICACIÓN / ZONA HORARIA
                </span>
              </div>

              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-center gap-3 text-[var(--foreground)]">
                  <span className="text-[var(--primary)]">📍</span>
                  <span>Lima, Perú</span>
                </div>
                <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
                  <span className="text-[var(--primary)]">🕐</span>
                  <span>GMT-5 (America/Lima)</span>
                </div>
                <div className="flex items-center gap-3 text-[var(--muted-foreground)]">
                  <span className="text-[var(--primary)]">🌐</span>
                  <span>Remoto global — Inglés/ Español</span>
                </div>
              </div>
            </div>

            <div className="overflow-hidden border border-[var(--border)] bg-[var(--card)] p-6 md:p-8 text-center">
              <div className="mb-6 flex items-center justify-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--muted-foreground)]" />
                <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted-foreground)]">
                  QUICK LINKS
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://github.com/Favio-coder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 font-mono text-sm uppercase tracking-wider text-[var(--muted-foreground)] border border-[var(--border)] rounded-sm hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/favio-asturimac-6b907825b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 font-mono text-sm uppercase tracking-wider text-[var(--muted-foreground)] border border-[var(--border)] rounded-sm hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
                >
                  LinkedIn
                </a>
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 font-mono text-sm uppercase tracking-wider text-[var(--muted-foreground)] border border-[var(--border)] rounded-sm hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
                >
                  Descargar CV
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
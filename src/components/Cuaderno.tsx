"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionDivider from "@/components/ui/SectionDivider";
import WeekDetail from "@/components/WeekDetail";
import { cuaderno, cuadernoIssues } from "@/data/cuaderno";

const weeks = [...cuaderno].sort((a, b) => a.number - b.number);

export default function Cuaderno() {
  const [selectedId, setSelectedId] = useState(weeks[0]?.id ?? "");
  const detailRegion = useRef<HTMLDivElement>(null);
  const currentIndex = Math.max(0, weeks.findIndex((week) => week.id === selectedId));
  const current = weeks[currentIndex];

  useEffect(() => {
    const syncWeek = () => {
      const id = window.location.hash.slice(1);
      if (weeks.some((week) => week.id === id)) setSelectedId(id);
    };
    syncWeek();
    window.addEventListener("hashchange", syncWeek);
    return () => window.removeEventListener("hashchange", syncWeek);
  }, []);
  useEffect(() => {
    if (!selectedId) return;
    detailRegion.current?.focus({ preventScroll: true });
    detailRegion.current?.scrollIntoView({
      block: "start",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [selectedId]);

  return (
    <section id="cuaderno" className="relative px-4 py-14 sm:px-6 md:px-8 md:py-20 lg:px-12">
      <div className="mx-auto max-w-350">
        <SectionHeading
          number="04"
          title="CUADERNO SEMANAL"
          subtitle="Registro de aprendizaje: temas, prácticas y reflexión por semana"
        />
        <SectionDivider className="my-6 md:my-8" label="WEEKLY_LOG" thick />

        {cuadernoIssues.length > 0 && (
          <div role="alert" className="mb-5 border border-border bg-card p-4 font-mono text-sm">
            Revisa src/data/cuaderno.json:
            <ul className="mt-2 list-inside list-disc">{cuadernoIssues.map((issue) => <li key={issue}>{issue}</li>)}</ul>
          </div>
        )}

        {weeks.length > 0 ? (
          <>
            <nav aria-label="Selector de semanas" className="mb-5 grid grid-cols-3 gap-2 sm:grid-cols-6">
              {weeks.map((week, index) => (
                <button
                  key={week.id}
                  type="button"
                  aria-label={`Abrir semana ${week.number}: ${week.title}`}
                  aria-current={week.id === current?.id ? "true" : undefined}
                  onClick={() => setSelectedId(week.id)}
                  className={`min-h-14 min-w-0 border px-2 py-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-primary ${week.id === current?.id ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary"}`}
                >
                  <span className="block font-mono text-xs text-primary-ink">
                    {String(week.number).padStart(2, "0")} / {week.status ?? "pendiente"}
                  </span>
                  <span className="mt-1 block truncate text-xs text-muted-foreground" title={week.title}>
                    {week.title}
                  </span>
                  <span className="sr-only">{index + 1} de {weeks.length}</span>
                </button>
              ))}
            </nav>

            {current && (
              <div
                ref={detailRegion}
                tabIndex={-1}
                className="scroll-mt-[calc(var(--nav-height)+16px)] space-y-4 outline-none"
              >
                <nav aria-label="Navegación entre semanas" className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    disabled={currentIndex === 0}
                    onClick={() => setSelectedId(weeks[currentIndex - 1].id)}
                    className="inline-flex min-h-11 items-center gap-2 border border-border px-3 font-mono text-xs transition-colors hover:border-primary disabled:opacity-40 sm:px-4"
                  >
                    <ChevronLeft className="size-4" aria-hidden="true" /> Anterior
                  </button>
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(current.number).padStart(2, "0")} / {String(weeks.length).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    disabled={currentIndex === weeks.length - 1}
                    onClick={() => setSelectedId(weeks[currentIndex + 1].id)}
                    className="inline-flex min-h-11 items-center gap-2 border border-border px-3 font-mono text-xs transition-colors hover:border-primary disabled:opacity-40 sm:px-4"
                  >
                    Siguiente <ChevronRight className="size-4" aria-hidden="true" />
                  </button>
                </nav>
                <WeekDetail key={current.id} week={current} />
              </div>
            )}
          </>
        ) : (
          <p className="border border-dashed border-border p-6 font-mono text-sm text-muted-foreground">
            No hay semanas disponibles.
          </p>
        )}
      </div>
    </section>
  );
}


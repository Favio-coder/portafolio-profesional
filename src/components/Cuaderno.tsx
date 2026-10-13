"use client";

import { useState } from "react";
import { ChevronDown, Code2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionDivider from "@/components/ui/SectionDivider";
import WeekDetail from "@/components/WeekDetail";
import { cuaderno, type WeekStatus } from "@/data/cuaderno";

const weeks = [...cuaderno].sort((a, b) => a.number - b.number);
const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function Cuaderno() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<WeekStatus | "">("");
  const filtered = weeks.filter((week) => (!status || (week.status ?? "pendiente") === status) && normalize([
    week.title, week.summary ?? week.description, ...(week.topics ?? []).map((topic) => topic.title),
    ...week.activities.flatMap((activity) => [activity.title, ...activity.learnedTopics]),
  ].join(" ")).includes(normalize(query.trim())));
  const index = filtered.findIndex((week) => week.id === selectedId);
  const current = filtered[index];
  const control = "w-full min-w-0 border border-border bg-background p-3 font-mono text-sm text-foreground focus-visible:outline-2 focus-visible:outline-primary";

  return (
    <section id="cuaderno" className="relative px-6 py-20 md:px-8 lg:px-12">
      <div className="mx-auto max-w-350">
        <SectionHeading number="04" title="CUADERNO SEMANAL" subtitle="Registro de aprendizaje: temas, laboratorios y reflexiones por semana" />
        <SectionDivider className="my-8 md:my-10" label="WEEKLY_LOG" thick />
        <div className="grid items-start gap-8 lg:grid-cols-[280px_1fr]">
          <Reveal className="min-w-0 lg:sticky lg:top-[calc(var(--nav-height)+32px)]">
            <aside className="overflow-hidden border border-border bg-card" aria-label="Selector de semanas">
              <div className="space-y-4 border-b border-border bg-muted/50 p-4">
                <p className="flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground"><Code2 className="size-4 text-primary-ink" aria-hidden="true" /> SEMANAS</p>
                <label className="block space-y-2"><span className="font-mono text-xs text-muted-foreground">Buscar por título o tema</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} className={control} placeholder="Buscar…" /></label>
                <label className="block space-y-2"><span className="font-mono text-xs text-muted-foreground">Estado</span><select value={status} onChange={(event) => setStatus(event.target.value as WeekStatus | "")} className={control}><option value="">Todos los estados</option>{(["pendiente", "en progreso", "completada"] as const).map((value) => <option key={value}>{value}</option>)}</select></label>
                <p role="status" className="font-mono text-xs text-muted-foreground">{filtered.length} semanas encontradas</p>
              </div>
              <div className="max-h-80 space-y-2 overflow-y-auto p-4 lg:max-h-[55vh]" data-lenis-prevent>
                {filtered.map((week) => <button key={week.id} type="button" aria-current={week.id === current?.id ? "true" : undefined} onClick={() => setSelectedId(week.id)} className={`w-full rounded-sm border p-4 text-left transition-all hover:border-primary ${week.id === current?.id ? "border-primary bg-primary/5" : "border-border bg-card"}`}><span className="font-mono text-lg text-primary-ink">{String(week.number).padStart(2, "0")}</span><span className="mt-1 block font-medium text-foreground">{week.title}</span><span className="mt-2 block font-mono text-xs text-muted-foreground">{week.date || "[ADD_DATE]"} · {week.status ?? "pendiente"}</span></button>)}
              </div>
            </aside>
          </Reveal>
          <div className="min-w-0 space-y-6">
            {current ? <>
              <nav aria-label="Navegación entre semanas" className="flex flex-wrap items-center justify-between gap-3 font-mono text-sm">
                <button type="button" disabled={index <= 0} onClick={() => setSelectedId(filtered[index - 1].id)} className="border border-border bg-muted px-4 py-2 transition-colors hover:border-primary disabled:opacity-40">← Anterior</button>
                <button type="button" onClick={() => setSelectedId(null)} className="text-primary-ink underline underline-offset-4">Todas las semanas</button>
                <button type="button" disabled={index >= filtered.length - 1} onClick={() => setSelectedId(filtered[index + 1].id)} className="border border-border bg-muted px-4 py-2 transition-colors hover:border-primary disabled:opacity-40">Siguiente →</button>
              </nav>
              <WeekDetail key={current.id} week={current} />
            </> : <>
              {filtered.length === 0 && <p className="border border-dashed border-border p-8 font-mono text-sm text-muted-foreground">No hay semanas que coincidan con la búsqueda.</p>}
              {filtered.map((week) => <Reveal key={week.id}><article className="border border-border bg-card p-6 md:p-8"><div className="mb-4 flex flex-wrap items-center justify-between gap-3"><span className="font-mono text-xs tracking-widest text-primary-ink">SEMANA {String(week.number).padStart(2, "0")}</span><span className="badge badge-primary">{week.status ?? "pendiente"}</span></div><h3 className="font-heading text-2xl font-semibold">{week.title}</h3><p className="mt-2 font-mono text-xs text-muted-foreground">{week.date || "[ADD_DATE]"} · {week.activities.length} actividades</p><p className="my-6 leading-relaxed text-muted-foreground">{week.summary ?? week.description}</p><button type="button" onClick={() => setSelectedId(week.id)} className="inline-flex items-center gap-2 font-mono text-sm text-primary-ink hover:underline">Abrir semana {week.number}<ChevronDown className="size-4" aria-hidden="true" /></button></article></Reveal>)}
            </>}
          </div>
        </div>
      </div>
    </section>
  );
}

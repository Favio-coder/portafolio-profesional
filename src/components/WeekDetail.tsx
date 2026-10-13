import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import SectionDivider from "@/components/ui/SectionDivider";
import { getWeekBibliography, type Week, type Evidence } from "@/data/cuaderno";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return <section className="space-y-4"><SectionDivider label={title} />{children}</section>;
}
function Lines({ items, placeholder }: { items?: string[]; placeholder: string }) {
  return items?.length ? <ul className="list-inside list-disc space-y-2 font-mono text-sm leading-relaxed text-muted-foreground">{items.map((item, i) => <li key={i}>{item}</li>)}</ul> : <p className="font-mono text-sm text-muted-foreground">{placeholder}</p>;
}
function EvidenceLinks({ items }: { items: Evidence[] }) {
  return <div className="grid gap-3 sm:grid-cols-2">{items.map((item, i) => <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="min-w-0 rounded-sm border border-border bg-muted p-4 transition-colors hover:border-primary"><span className="font-mono text-xs uppercase text-primary-ink">{item.type} ↗</span><p className="break-words font-medium">{item.title}</p>{item.description && <p className="mt-2 font-mono text-xs text-muted-foreground">{item.description}</p>}</a>)}</div>;
}

export default function WeekDetail({ week }: { week: Week }) {
  const references = getWeekBibliography(week);
  const reflectionFields = [["whatLearned", "QUÉ APRENDÍ"], ["howLearned", "CÓMO APRENDÍ"], ["difficulties", "DIFICULTADES"], ["solutions", "CÓMO LAS RESOLVÍ"], ["improvements", "QUÉ MEJORARÉ"]] as const;
  return <Reveal className="space-y-8 border border-border bg-card p-6 md:p-8">
    <header><p className="mb-2 font-mono text-xs tracking-widest text-primary-ink">SEMANA {String(week.number).padStart(2, "0")} / {week.status ?? "pendiente"}</p><h2 className="font-heading text-2xl font-semibold">{week.title}</h2><p className="mt-2 font-mono text-xs text-muted-foreground">{week.date || "[ADD_DATE]"}</p><p className="mt-4 leading-relaxed text-muted-foreground">{week.summary ?? week.description}</p></header>
    <Block title="01 / OBJETIVOS DE APRENDIZAJE"><Lines items={week.objectives} placeholder="[ADD_OBJECTIVES]" /></Block>
    <Block title="02 / TEMAS">
      {(week.topics ?? []).map((topic, i) => <div key={i} className="space-y-3"><h3 className="font-heading font-semibold">{topic.title}</h3><p className="font-mono text-sm leading-relaxed">{topic.explanation}</p><p className="font-mono text-xs text-primary-ink">DEFINICIONES</p><Lines items={topic.definitions} placeholder="[ADD_DEFINITIONS]" /><p className="font-mono text-xs text-primary-ink">PROCEDIMIENTOS</p><Lines items={topic.procedures} placeholder="[ADD_PROCEDURES]" /></div>)}
      {!week.topics?.length && <><Lines items={week.activities.flatMap((activity) => activity.learnedTopics)} placeholder="[ADD_TOPICS]" /><p className="font-mono text-xs text-muted-foreground">[ADD_EXPLANATIONS_AND_DEFINITIONS] · Completar con mis palabras.</p></>}
    </Block>
    <Block title="03 / ACTIVIDADES Y LABORATORIOS">
      {!week.activities.length && <p className="font-mono text-sm text-muted-foreground">[ADD_ACTIVITIES]</p>}
      {week.activities.map((activity, index) => <details key={activity.id} className="group overflow-hidden border border-border bg-card" open={undefined}><summary className="cursor-pointer bg-muted/50 p-4 font-heading font-semibold transition-colors hover:bg-muted"><span className="mr-3 font-mono text-primary-ink">{String(index + 1).padStart(2, "0")}</span>{activity.title}</summary><div className="space-y-5 p-4 md:p-5">
        <p className="font-mono text-sm leading-relaxed">{activity.description}</p>
        <Block title="ENUNCIADO"><Lines items={activity.labExercises} placeholder="[ADD_STATEMENT]" /></Block>
        <Block title="PASOS"><ol className="list-inside list-decimal space-y-2 font-mono text-sm text-muted-foreground">{activity.procedures.map((step, i) => <li key={i}>{step}</li>)}</ol></Block>
        <Block title="HERRAMIENTAS"><Lines items={activity.tools} placeholder="[ADD_TOOLS]" /></Block>
        <Block title="DESARROLLO"><p className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{activity.labDevelopment || "[ADD_DEVELOPMENT]"}</p></Block>
        {activity.code && <pre className="max-w-full overflow-x-auto border border-border bg-muted p-4 text-sm" data-lenis-prevent><code>{activity.code}</code></pre>}
        <Block title="RESULTADOS"><p className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed">{activity.labResults || "[ADD_RESULTS]"}</p></Block>
      </div></details>)}
    </Block>
    <Block title="04 / EVIDENCIAS">
      {(week.evidence?.length || week.activities.some((activity) => activity.evidence.length)) ? <><EvidenceLinks items={week.evidence ?? []} />{week.activities.filter((activity) => activity.evidence.length).map((activity) => <div key={activity.id} className="space-y-3"><h3 className="font-mono text-xs text-muted-foreground">{activity.title}</h3><EvidenceLinks items={activity.evidence} /></div>)}</> : <p className="font-mono text-sm text-muted-foreground">[ADD_EVIDENCE]</p>}
    </Block>
    <Block title="05 / REFLEXIÓN DE LA SEMANA">
      <div className="grid gap-4 md:grid-cols-2">{reflectionFields.map(([field, label]) => {
        const legacy = field === "whatLearned" || field === "howLearned" ? week.activities.filter((activity) => activity.reflection?.[field]) : [];
        return <div key={field} className="space-y-3 rounded-sm border border-border bg-muted p-4"><h3 className="font-mono text-xs tracking-widest text-muted-foreground">{label}</h3>{week.reflection?.[field] ? <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{week.reflection[field]}</p> : legacy.length ? legacy.map((activity) => <div key={activity.id}><p className="mb-2 font-mono text-xs text-primary-ink">{activity.title}</p><p className="font-mono text-sm leading-relaxed">{activity.reflection[field as "whatLearned" | "howLearned"]}</p></div>) : <p className="font-mono text-sm">[ADD_REFLECTION]</p>}</div>;
      })}</div>
    </Block>
    <Block title="06 / BIBLIOGRAFÍA DE LA SEMANA">
      {!references.length && <p className="font-mono text-sm text-muted-foreground">[ADD_BIBLIOGRAPHY] · Libros y páginas web.</p>}
      {references.map((entry) => <article key={entry.id} className="space-y-2 border border-border bg-muted p-4"><p className="font-mono text-xs uppercase text-primary-ink">{entry.type === "book" ? "Libro" : "Página web"}</p><h3 className="font-medium">{entry.title}</h3><p className="font-mono text-xs text-muted-foreground">{[entry.author, entry.year].filter(Boolean).join(" · ")}</p>{entry.description && <p className="font-mono text-sm text-muted-foreground">{entry.description}</p>}{entry.url && <a href={entry.url} target="_blank" rel="noopener noreferrer" className="inline-block font-mono text-xs text-primary-ink hover:underline">Ver recurso ↗</a>}</article>)}
    </Block>
  </Reveal>;
}

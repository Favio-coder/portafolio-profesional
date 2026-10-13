import { imageSizes } from "@/lib/image-assets";
import type { ReactNode } from "react";
import Image from "next/image";
import SectionDivider from "@/components/ui/SectionDivider";
import { getWeekBibliography, type Week, type Evidence } from "@/data/cuaderno";

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section key={title} className="space-y-4">
      <SectionDivider label={title} />
      {children}
    </section>
  );
}

function Lines({ items, placeholder }: { items?: string[]; placeholder: string }) {
  return items?.length ? (
    <ul className="list-inside list-disc space-y-2 font-mono text-sm leading-relaxed text-muted-foreground">
      {items.map((item, i) => (
        <li key={`${placeholder}-${i}`}>{item}</li>
      ))}
    </ul>
  ) : (
    <p key={`placeholder-${placeholder}`} className="font-mono text-sm text-muted-foreground">
      {placeholder}
    </p>
  );
}

function EvidenceLinks({ items }: { items: Evidence[] }) {
  return (
    <div key="evidence-links" className="grid gap-3 sm:grid-cols-2">
      {items.map((item, i) => (
        <a
          key={`${item.type}-${i}-${item.url.slice(0, 20)}`}
          href={item.url}
          download={item.download ? item.fileName || true : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0 rounded-sm border border-border bg-muted p-4 transition-colors hover:border-primary"
        >
          <span className="font-mono text-xs uppercase text-primary-ink">
            {item.type} ↗
          </span>
          {item.type === "image" && <span className="relative my-3 block aspect-4/3 overflow-hidden border border-border bg-background"><Image src={item.url} alt={item.alt || item.title} fill sizes={imageSizes.evidence} className="object-contain" /></span>}
          <p className="wrap-words- font-medium">{item.title}</p>
          {item.description && (
            <p className="mt-2 font-mono text-xs text-muted-foreground">{item.description}</p>
          )}
        </a>
      ))}
    </div>
  );
}

export default function WeekDetail({ week }: { week: Week }) {
  const references = getWeekBibliography(week);
  const reflectionFields = [
    ["whatLearned", "QUÉ APRENDÍ"],
    ["howLearned", "CÓMO APRENDÍ"],
    ["difficulties", "DIFICULTADES"],
    ["solutions", "CÓMO LAS RESOLVÍ"],
    ["improvements", "QUÉ MEJORARÉ"],
  ] as const;

  return (
    <article className="week-detail min-w-0 space-y-8 border border-border bg-card p-6 md:p-8">
      <header key="week-header">
        <p className="mb-2 font-mono text-xs tracking-widest text-primary-ink">
          SEMANA {String(week.number).padStart(2, "0")} / {week.status ?? "pendiente"}
        </p>
        <h2 className="font-heading text-2xl font-semibold">{week.title}</h2>
        <p className="mt-2 font-mono text-xs text-muted-foreground">
          {week.date || "[ADD_DATE]"}
        </p>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {week.summary ?? week.description}
        </p>
      </header>

      <Block title="01 / OBJETIVOS DE APRENDIZAJE">
        <Lines items={week.objectives} placeholder="[ADD_OBJECTIVES]" />
      </Block>

      <Block title="02 / TEMAS">
        {week.topics?.length ? (
          week.topics.map((topic, i) => (
            <div key={`topic-${i}`} className="space-y-3">
              <h3 className="font-heading font-semibold">{topic.title}</h3>
              <p className="font-mono text-sm text-muted-foreground">
                {topic.explanation || "[ADD_EXPLANATION] · Completar con mi explicación."}
              </p>
              <p className="font-mono text-xs text-primary-ink">DEFINICIONES</p>
              <Lines items={topic.definitions} placeholder="[ADD_DEFINITIONS]" />
              <p className="font-mono text-xs text-primary-ink">PROCEDIMIENTOS</p>
              <Lines items={topic.procedures} placeholder="[ADD_PROCEDURES]" />
            </div>
          ))
        ) : (
          <>
            <Lines
              items={week.activities.flatMap((activity) => activity.learnedTopics)}
              placeholder="[ADD_TOPICS]"
            />
            <p key="topics-placeholder" className="font-mono text-xs text-muted-foreground">
              [ADD_EXPLANATIONS_AND_DEFINITIONS] · Completar con mis palabras.
            </p>
          </>
        )}
      </Block>

      <Block title="03 / ACTIVIDADES Y LABORATORIOS">
        {!week.activities.length && (
          <p key="no-activities" className="font-mono text-sm text-muted-foreground">
            [ADD_ACTIVITIES]
          </p>
        )}
        {week.activities.map((activity, index) => (
          <details key={activity.id} className="group overflow-hidden border border-border bg-card" open>
            <summary className="cursor-pointer bg-muted/50 p-4 font-heading font-semibold transition-colors hover:bg-muted">
              <span className="mr-3 font-mono text-primary-ink">
                {String(index + 1).padStart(2, "0")}
              </span>
              {activity.title}
            </summary>
            <div className="space-y-5 p-4 md:p-5">
              <p key={`activity-desc-${activity.id}`} className="font-mono text-sm leading-relaxed">
                {activity.description}
              </p>
              <Block title="ENUNCIADO">
                <Lines items={activity.labExercises} placeholder="[ADD_STATEMENT]" />
              </Block>
              <Block title="PASOS">
                <ol className="list-inside list-decimal space-y-2 font-mono text-sm text-muted-foreground">
                  {activity.procedures.map((step, i) => (
                    <li key={`step-${activity.id}-${i}`}>{step}</li>
                  ))}
                </ol>
              </Block>
              <Block title="HERRAMIENTAS">
                <Lines items={activity.tools} placeholder="[ADD_TOOLS]" />
              </Block>
              <Block title="DESARROLLO">
                <p key={`activity-dev-${activity.id}`} className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                  {activity.labDevelopment || "[ADD_DEVELOPMENT]"}
                </p>
              </Block>
              {activity.code && (
                <pre key={`activity-code-${activity.id}`} className="max-w-full overflow-x-auto border border-border bg-muted p-4 text-sm" data-lenis-prevent>
                  <code>{activity.code}</code>
                </pre>
              )}
              <Block title="RESULTADOS">
                <p key={`activity-results-${activity.id}`} className="whitespace-pre-wrap wrap-break- font-mono text-sm leading-relaxed">
                  {activity.labResults || "[ADD_RESULTS]"}
                </p>
              </Block>
            </div>
          </details>
        ))}
      </Block>

      <Block title="04 / EVIDENCIAS">
        {week.evidence?.length || week.activities.some((activity) => activity.evidence.length) ? (
          <>
            <EvidenceLinks items={week.evidence ?? []} />
            {week.activities
              .filter((activity) => activity.evidence.length)
              .map((activity) => (
                <div key={`activity-evidence-${activity.id}`} className="space-y-3">
                  <h3 className="font-mono text-xs text-muted-foreground">{activity.title}</h3>
                  <EvidenceLinks items={activity.evidence} />
                </div>
              ))}
          </>
        ) : (
          <p key="no-evidence" className="font-mono text-sm text-muted-foreground">
            [ADD_EVIDENCE]
          </p>
        )}
      </Block>

      <Block title="05 / REFLEXIÓN DE LA SEMANA">
        <div className="grid gap-4 md:grid-cols-2">
          {reflectionFields.map(([field, label]) => {
            const legacy =
              field === "whatLearned" || field === "howLearned"
                ? week.activities.filter((activity) => activity.reflection?.[field])
                : [];
            return (
              <div key={field} className="space-y-3 rounded-sm border border-border bg-muted p-4">
                <h3 className="font-mono text-xs tracking-widest text-muted-foreground">
                  {label}
                </h3>
                {week.reflection?.[field] ? (
                  <p key={`reflection-${field}`} className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                    {week.reflection[field]}
                  </p>
                ) : legacy.length ? (
                  legacy.map((activity) => (
                    <div key={`legacy-${activity.id}-${field}`}>
                      <p className="mb-2 font-mono text-xs text-primary-ink">{activity.title}</p>
                      <p className="font-mono text-sm leading-relaxed">
                        {activity.reflection[field as "whatLearned" | "howLearned"]}
                      </p>
                    </div>
                  ))
                ) : (
                  <p key={`placeholder-${field}`} className="font-mono text-sm">
                    [ADD_REFLECTION]
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </Block>

      <Block title="06 / BIBLIOGRAFÍA DE LA SEMANA">
        {!references.length && (
          <p key="no-bibliography" className="font-mono text-sm text-muted-foreground">
            [ADD_BIBLIOGRAPHY] · Libros y páginas web.
          </p>
        )}
        {references.map((entry) => (
          <article
            key={entry.id}
            className="space-y-2 border border-border bg-muted p-4"
          >
            <p className="font-mono text-xs uppercase text-primary-ink">
              {entry.type === "book" ? "Libro" : "Página web"}
            </p>
            <h3 className="font-medium">{entry.title}</h3>
            <p className="font-mono text-xs text-muted-foreground">
              {[entry.author, entry.year].filter(Boolean).join(" · ")}
            </p>
            {entry.description && (
              <p className="font-mono text-sm text-muted-foreground">{entry.description}</p>
            )}
            {entry.url && (
              <a
                key={`bib-url-${entry.id}`}
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-mono text-xs text-primary-ink hover:underline"
              >
                Ver recurso ↗
              </a>
            )}
          </article>
        ))}
      </Block>
    </article>
  );
}


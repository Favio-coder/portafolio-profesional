"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { Download, ExternalLink, FileText } from "lucide-react";
import { imageSizes } from "@/lib/image-assets";
import { getWeekBibliography, type Evidence, type Week } from "@/data/cuaderno";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

const tabs = [
  { id: "explanation", label: "Explicación" },
  { id: "development", label: "Desarrollo" },
  { id: "results", label: "Resultados" },
  { id: "evidence", label: "Evidencias" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function LongText({ text, className = "" }: { text: string; className?: string }) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();
  const limit = 520;
  const isLong = text.length > limit;
  const cutoff = isLong ? text.lastIndexOf(" ", limit) : text.length;
  const excerpt = isLong ? `${text.slice(0, cutoff > 0 ? cutoff : limit).trimEnd()}…` : text;

  return (
    <div className="space-y-2">
      <p id={contentId} className={className}>{expanded ? text : excerpt}</p>
      {isLong && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={contentId}
          onClick={() => setExpanded((value) => !value)}
          className="min-h-11 font-mono text-xs text-primary-ink underline underline-offset-4 hover:text-foreground"
        >
          {expanded ? "Leer menos" : "Leer más"}
        </button>
      )}
    </div>
  );
}

const reflectionFields = [
  ["whatLearned", "QUÉ APRENDÍ"],
  ["howLearned", "CÓMO APRENDÍ"],
  ["difficulties", "DIFICULTADES"],
  ["solutions", "CÓMO LAS RESOLVÍ"],
  ["improvements", "QUÉ MEJORARÉ"],
] as const;

function ResourceRow({ item }: { item: Evidence }) {
  const external = item.url.startsWith("http");
  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <article className="flex min-w-0 flex-col gap-3 border-b border-border py-4 first:border-t sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        {item.type === "file" ? (
          <FileText className="mt-0.5 size-4 shrink-0 text-primary-ink" aria-hidden="true" />
        ) : (
          <ExternalLink className="mt-0.5 size-4 shrink-0 text-primary-ink" aria-hidden="true" />
        )}
        <div className="min-w-0">
          <p className="break-words font-medium">{item.title}</p>
          {item.description && (
            <p className="mt-1 max-w-prose font-mono text-xs leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          )}
        </div>
      </div>
      <div className="flex shrink-0 flex-wrap gap-2 pl-7 sm:pl-0">
        <a
          href={item.url}
          {...linkProps}
          className="inline-flex min-h-11 items-center gap-2 border border-border px-3 font-mono text-xs text-foreground transition-colors hover:border-primary"
        >
          Abrir <ExternalLink className="size-3.5" aria-hidden="true" />
        </a>
        {item.type === "file" && (
          <a
            href={item.url}
            download={item.fileName || true}
            className="inline-flex min-h-11 items-center gap-2 border border-border px-3 font-mono text-xs text-foreground transition-colors hover:border-primary"
          >
            Descargar <Download className="size-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}

function EvidenceGallery({
  items,
  onSelect,
}: {
  items: Evidence[];
  onSelect: (item: Evidence, opener: HTMLButtonElement) => void;
}) {
  const images = items.filter((item) => item.type === "image");
  const resources = items.filter((item) => item.type !== "image");

  return (
    <div className="space-y-4">
      {images.length > 0 && (
        <div className="grid gap-4 xl:grid-cols-2">
          {images.map((item) => (
            <article
              key={`${item.url}-${item.title}`}
              className="grid min-w-0 items-start gap-4 border border-border bg-muted/40 p-3 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:p-4"
            >
              <div className="min-w-0">
                <h4 className="break-words font-medium">{item.title}</h4>
                {item.description && (
                  <p className="mt-2 max-w-prose font-mono text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                )}
                <p className="mt-3 font-mono text-[0.65rem] uppercase tracking-wider text-primary-ink">
                  Imagen · seleccionar para ampliar
                </p>
              </div>
              <button
                type="button"
                onClick={(event) => onSelect(item, event.currentTarget)}
                aria-label={`Ampliar evidencia: ${item.alt || item.title}`}
                className="group relative aspect-[4/3] w-full min-w-0 overflow-hidden border border-border bg-background focus-visible:outline-2 focus-visible:outline-primary"
              >
                <Image
                  src={item.url}
                  alt={item.alt || item.title}
                  fill
                  sizes={imageSizes.evidence}
                  className="object-contain transition-transform duration-300 motion-safe:group-hover:scale-[1.02]"
                />
              </button>
            </article>
          ))}
        </div>
      )}
      {resources.map((item) => (
        <ResourceRow key={`${item.type}-${item.url}-${item.title}`} item={item} />
      ))}
    </div>
  );
}

export default function WeekDetail({ week }: { week: Week }) {
  const [activityIndex, setActivityIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<TabId>("explanation");
  const [selectedImage, setSelectedImage] = useState<Evidence | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const imageOpener = useRef<HTMLButtonElement | null>(null);
  const activity = week.activities[activityIndex];
  const references = getWeekBibliography(week);
  const evidence = [...(week.evidence ?? []), ...(activity?.evidence ?? [])];

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const directions: Record<string, number> = {
      ArrowRight: (index + 1) % tabs.length,
      ArrowLeft: (index - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    };
    const nextIndex = directions[event.key];
    if (nextIndex === undefined) return;
    event.preventDefault();
    setActiveTab(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <article className="min-w-0 space-y-6 border border-border bg-card p-4 sm:p-6 md:p-8">
      <header className="max-w-4xl">
        <p className="mb-2 font-mono text-xs tracking-widest text-primary-ink">
          SEMANA {String(week.number).padStart(2, "0")} / {week.status ?? "pendiente"}
          {week.date && ` / ${week.date}`}
        </p>
        <h2 className="font-heading text-2xl font-semibold sm:text-3xl">{week.title}</h2>
        <p className="mt-3 max-w-prose leading-relaxed text-muted-foreground">
          {week.summary || week.description}
        </p>
        {week.objectives?.length ? (
          <section className="mt-5 border-l-2 border-primary pl-4" aria-labelledby="week-objectives">
            <h3 id="week-objectives" className="mb-2 font-mono text-xs tracking-widest text-primary-ink">
              OBJETIVOS
            </h3>
            <ul className="max-w-prose space-y-1.5 text-sm leading-relaxed text-muted-foreground">
              {week.objectives.map((objective) => <li key={objective}>{objective}</li>)}
            </ul>
          </section>
        ) : null}
      </header>

      {week.topics?.length ? (
        <details className="border-y border-border py-3">
          <summary className="min-h-11 cursor-pointer py-2 font-mono text-xs tracking-widest text-primary-ink hover:text-foreground">
            CONCEPTOS, DEFINICIONES Y PROCEDIMIENTOS ({week.topics.length})
          </summary>
          <div className="mt-3 divide-y divide-border">
            {week.topics.map((topic, index) => (
              <details key={`${topic.title}-${index}`} className="py-3">
                <summary className="min-h-11 cursor-pointer py-2 font-medium hover:text-primary-ink">
                  <span className="mr-2 font-mono text-xs text-primary-ink">{String(index + 1).padStart(2, "0")}</span>
                  {topic.title}
                </summary>
                <div className="max-w-prose space-y-3 pb-3 pl-6">
                  {topic.explanation && (
                    <p className="font-mono text-sm leading-relaxed text-muted-foreground">{topic.explanation}</p>
                  )}
                  {topic.definitions?.length ? (
                    <div>
                      <h4 className="mb-1 font-mono text-[0.65rem] tracking-widest text-primary-ink">DEFINICIONES</h4>
                      <ul className="space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                        {topic.definitions.map((definition) => <li key={definition}>{definition}</li>)}
                      </ul>
                    </div>
                  ) : null}
                  {topic.procedures?.length ? (
                    <div>
                      <h4 className="mb-1 font-mono text-[0.65rem] tracking-widest text-primary-ink">PROCEDIMIENTOS</h4>
                      <ul className="space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                        {topic.procedures.map((procedure) => <li key={procedure}>{procedure}</li>)}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </details>
            ))}
          </div>
        </details>
      ) : null}

      {activity ? (
        <>
          <section aria-label="Actividad seleccionada" className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <label className="min-w-0 flex-1 space-y-2">
              <span className="block font-mono text-xs tracking-widest text-muted-foreground">
                ACTIVIDAD {String(activityIndex + 1).padStart(2, "0")} / {String(week.activities.length).padStart(2, "0")}
              </span>
              <select
                value={activityIndex}
                onChange={(event) => {
                  setActivityIndex(Number(event.target.value));
                  setActiveTab("explanation");
                }}
                className="min-h-12 w-full min-w-0 border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-primary"
              >
                {week.activities.map((item, index) => (
                  <option key={item.id} value={index}>{String(index + 1).padStart(2, "0")} / {item.title}</option>
                ))}
              </select>
            </label>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                disabled={activityIndex === 0}
                onClick={() => { setActivityIndex((index) => index - 1); setActiveTab("explanation"); }}
                className="min-h-11 border border-border px-3 font-mono text-xs transition-colors hover:border-primary disabled:opacity-40"
              >
                ← Anterior
              </button>
              <button
                type="button"
                disabled={activityIndex === week.activities.length - 1}
                onClick={() => { setActivityIndex((index) => index + 1); setActiveTab("explanation"); }}
                className="min-h-11 border border-border px-3 font-mono text-xs transition-colors hover:border-primary disabled:opacity-40"
              >
                Siguiente →
              </button>
            </div>
          </section>

          <section className="min-w-0" aria-labelledby="activity-title">
            <h3 id="activity-title" className="mb-4 max-w-4xl font-heading text-xl font-semibold sm:text-2xl">
              {activity.title}
            </h3>
            <div role="tablist" aria-label={`Secciones de ${activity.title}`} className="grid grid-cols-2 border-b border-border sm:flex sm:flex-wrap">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  ref={(element) => { tabRefs.current[index] = element; }}
                  id={`tab-${activity.id}-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`panel-${activity.id}`}
                  tabIndex={activeTab === tab.id ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  className={`min-h-12 border-b-2 px-3 py-2 text-left font-mono text-xs transition-colors sm:px-4 ${activeTab === tab.id ? "border-primary text-primary-ink" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                >
                  {tab.label}
                  {tab.id === "evidence" && evidence.length > 0 && <span className="ml-1.5 opacity-70">({evidence.length})</span>}
                </button>
              ))}
            </div>

            <div
              id={`panel-${activity.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${activity.id}-${activeTab}`}
              tabIndex={0}
              className="min-w-0 py-5 focus-visible:outline-2 focus-visible:outline-primary"
            >
              {activeTab === "explanation" && (
                <div className="max-w-4xl space-y-5">
                  {activity.description && <LongText text={activity.description} className="max-w-prose leading-relaxed text-muted-foreground" />}
                  {activity.labExercises?.length ? (
                    <div>
                      <h4 className="mb-2 font-mono text-xs tracking-widest text-primary-ink">ENUNCIADO</h4>
                      <ul className="max-w-prose space-y-2 text-sm leading-relaxed">
                        {activity.labExercises.map((exercise) => <li key={exercise}>{exercise}</li>)}
                      </ul>
                    </div>
                  ) : null}
                  {activity.learnedTopics?.length ? (
                    <div>
                      <h4 className="mb-2 font-mono text-xs tracking-widest text-primary-ink">IDEAS CLAVE</h4>
                      <ul className="max-w-prose space-y-2 text-sm leading-relaxed text-muted-foreground">
                        {activity.learnedTopics.map((topic) => <li key={topic}>{topic}</li>)}
                      </ul>
                    </div>
                  ) : null}
                </div>
              )}

              {activeTab === "development" && (
                <div className="max-w-4xl space-y-5">
                  {activity.procedures?.length ? (
                    <div>
                      <h4 className="mb-2 font-mono text-xs tracking-widest text-primary-ink">PROCEDIMIENTO</h4>
                      <ol className="max-w-prose list-inside list-decimal space-y-2 text-sm leading-relaxed text-muted-foreground">
                        {activity.procedures.map((step) => <li key={step}>{step}</li>)}
                      </ol>
                    </div>
                  ) : null}
                  {activity.tools?.length ? (
                    <div>
                      <h4 className="mb-2 font-mono text-xs tracking-widest text-primary-ink">HERRAMIENTAS</h4>
                      <ul className="flex flex-wrap gap-2">
                        {activity.tools.map((tool) => <li key={tool} className="border border-border px-2 py-1 font-mono text-xs text-muted-foreground">{tool}</li>)}
                      </ul>
                    </div>
                  ) : null}
                  {activity.labDevelopment && (
                    <div>
                      <h4 className="mb-2 font-mono text-xs tracking-widest text-primary-ink">DESARROLLO DOCUMENTADO</h4>
                      <LongText text={activity.labDevelopment} className="max-w-prose whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground" />
                    </div>
                  )}
                  {activity.code && (
                    <pre className="max-w-full overflow-x-auto border border-border bg-muted p-4 text-xs leading-relaxed" tabIndex={0}>
                      <code>{activity.code}</code>
                    </pre>
                  )}
                </div>
              )}

              {activeTab === "results" && activity.labResults && (
                <LongText text={activity.labResults} className="max-w-prose whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground" />
              )}

              {activeTab === "evidence" && evidence.length > 0 && (
                <EvidenceGallery
                  items={evidence}
                  onSelect={(item, opener) => {
                    imageOpener.current = opener;
                    setSelectedImage(item);
                  }}
                />
              )}
              {activeTab === "evidence" && evidence.length === 0 && (
                <p className="font-mono text-sm text-muted-foreground">Esta actividad no tiene archivos adjuntos.</p>
              )}
            </div>
          </section>
        </>
      ) : (
        <p className="font-mono text-sm text-muted-foreground">Esta semana no registra actividades.</p>
      )}

      <section className="space-y-3 border-t border-border pt-5" aria-label="Reflexión y bibliografía semanal">
        {week.reflection && reflectionFields.some(([field]) => Boolean(week.reflection?.[field])) ? (
          <details className="border-b border-border pb-3">
            <summary className="min-h-11 cursor-pointer py-2 font-mono text-xs tracking-widest text-primary-ink hover:text-foreground">
              REFLEXIÓN SEMANAL
            </summary>
            <dl className="grid gap-x-8 gap-y-5 pt-3 md:grid-cols-2">
              {reflectionFields.map(([field, label]) => {
                const value = week.reflection?.[field];
                return value ? (
                  <div key={field} className="max-w-prose space-y-2">
                    <dt className="font-mono text-[0.65rem] tracking-widest text-primary-ink">{label}</dt>
                    <dd><LongText text={value} className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground" /></dd>
                  </div>
                ) : null;
              })}
            </dl>
          </details>
        ) : null}

        {references.length > 0 && (
          <details className="border-b border-border pb-3">
            <summary className="min-h-11 cursor-pointer py-2 font-mono text-xs tracking-widest text-primary-ink hover:text-foreground">
              BIBLIOGRAFÍA ({references.length})
            </summary>
            <ul className="divide-y divide-border pt-1">
              {references.map((entry) => (
                <li key={entry.id} className="flex min-w-0 flex-col gap-2 py-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="break-words font-medium">{entry.title}</p>
                    {(entry.author || entry.year) && (
                      <p className="mt-1 font-mono text-xs text-muted-foreground">
                        {[entry.author, entry.year].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>
                  {entry.url && (
                    <a
                      href={entry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 shrink-0 items-center gap-2 font-mono text-xs text-primary-ink underline-offset-4 hover:underline"
                    >
                      Ver fuente <ExternalLink className="size-3.5" aria-hidden="true" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </details>
        )}
      </section>

      <Dialog open={selectedImage !== null} onOpenChange={(open) => { if (!open) setSelectedImage(null); }}>
        <DialogContent
          className="gallery-lightbox w-[calc(100%-1rem)] sm:w-[min(960px,calc(100vw-2rem))]"
          showCloseButton={false}
          finalFocus={imageOpener}
        >
          {selectedImage && (
            <>
              <div className="flex min-w-0 items-start justify-between gap-4">
                <div className="min-w-0">
                  <DialogTitle className="break-words">{selectedImage.title}</DialogTitle>
                  {selectedImage.description && <DialogDescription className="mt-1">{selectedImage.description}</DialogDescription>}
                </div>
                <DialogClose className="lightbox-control" aria-label="Cerrar imagen">Cerrar ×</DialogClose>
              </div>
              <div className="lightbox-image">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.alt || selectedImage.title}
                  fill
                  sizes={imageSizes.lightbox}
                  className="object-contain"
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </article>
  );
}

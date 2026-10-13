import weekData from "./cuaderno.json";
import type { BibliographyEntry } from "./bibliography";

export interface Evidence {
  type: "image" | "link" | "file" | "repository";
  title: string;
  url: string;
  description?: string;
  alt?: string;
  download?: boolean;
  fileName?: string;
}
export interface Reflection {
  whatLearned?: string;
  howLearned?: string;
  difficulties?: string;
  solutions?: string;
  improvements?: string;
}
export interface Activity {
  id: string;
  title: string;
  description: string;
  learnedTopics: string[];
  procedures: string[];
  labExercises: string[];
  labDevelopment: string;
  labResults: string;
  reflection: Reflection;
  references: string[];
  evidence: Evidence[];
  tools?: string[];
  code?: string;
}
export interface Topic {
  title: string;
  explanation: string;
  definitions?: string[];
  procedures?: string[];
}
export type WeekStatus = "pendiente" | "en progreso" | "completada";
export interface Week {
  id: string;
  number: number;
  title: string;
  description: string;
  activities: Activity[];
  date?: string;
  summary?: string;
  status?: WeekStatus;
  objectives?: string[];
  topics?: Topic[];
  evidence?: Evidence[];
  reflection?: Reflection;
  bibliography?: BibliographyEntry[];
}

type RecordData = Record<string, unknown>;
const object = (value: unknown): RecordData => value !== null && typeof value === "object" && !Array.isArray(value) ? value as RecordData : {};
const text = (value: unknown) => typeof value === "string" ? value : "";
const list = (value: unknown): unknown[] => Array.isArray(value) ? value : [];
const strings = (value: unknown) => list(value).filter((item): item is string => typeof item === "string");
const reflection = (value: unknown): Reflection => {
  const source = object(value);
  return Object.fromEntries(["whatLearned", "howLearned", "difficulties", "solutions", "improvements"].map((key) => [key, text(source[key])]));
};
function evidence(value: unknown): Evidence[] {
  return list(value).flatMap((item) => {
    const source = object(item);
    const type = source.type;
    if (!["image", "link", "file", "repository"].includes(text(type)) || !text(source.url)) return [];
    return [{ type: type as Evidence["type"], title: text(source.title), url: text(source.url), description: text(source.description), alt: text(source.alt), download: source.download === true, fileName: text(source.fileName) }];
  });
}
function citation(value: unknown, id: string): BibliographyEntry | null {
  if (typeof value === "string") {
    return { id, type: "web", title: value, url: value.match(/https?:\/\/\S+/)?.[0] };
  }
  const source = object(value);
  if (!text(source.title) || (source.type !== "book" && source.type !== "web")) return null;
  return { id: text(source.id) || id, type: source.type, title: text(source.title), author: text(source.author), year: text(source.year), url: text(source.url) || undefined, description: text(source.description) };
}

// Normalize at the boundary: older JSON and partially filled weeks remain usable.
export function normalizeWeeks(data: unknown): { weeks: Week[]; issues: string[] } {
  const issues: string[] = [];
  const seen = new Set<string>();
  const numbers = new Set<number>();
  const weeks = list(data).flatMap((item, index): Week[] => {
    const source = object(item);
    const id = text(source.id) || `semana-${source.number}`;
    const number = Number(source.number);
    if (!Number.isInteger(number) || number < 1 || !text(source.title) || seen.has(id) || numbers.has(number)) {
      issues.push(`Registro ${index + 1}: revisa número, título e identificadores únicos.`);
      return [];
    }
    seen.add(id);
    numbers.add(number);
    const activities = list(source.activities).map((item, activityIndex): Activity => {
      const activity = object(item);
      const title = text(activity.title);
      if (!title) issues.push(`Semana ${number}, actividad ${activityIndex + 1}: falta el título.`);
      return { id: text(activity.id) || `${id}-act-${activityIndex + 1}`, title: title || `Actividad ${activityIndex + 1}`, description: text(activity.description), learnedTopics: strings(activity.learnedTopics), procedures: strings(activity.procedures), labExercises: strings(activity.labExercises), labDevelopment: text(activity.labDevelopment), labResults: text(activity.labResults), reflection: reflection(activity.reflection), references: strings(activity.references), evidence: evidence(activity.evidence), tools: strings(activity.tools), code: text(activity.code) };
    });
    return [{ id, number, title: text(source.title), description: text(source.description), summary: text(source.summary) || text(source.description), date: text(source.date), status: source.status === "completada" || source.status === "en progreso" ? source.status : "pendiente", objectives: strings(source.objectives), activities, topics: list(source.topics).map((item): Topic => {
      if (typeof item === "string") return { title: item, explanation: "" };
      const topic = object(item);
      return { title: text(topic.title), explanation: text(topic.explanation), definitions: strings(topic.definitions), procedures: strings(topic.procedures) };
    }), evidence: evidence(source.evidence), reflection: reflection(source.reflection), bibliography: list(source.bibliography).flatMap((item, i) => {
      const entry = citation(item, `${id}-bib-${i}`);
      return entry ? [entry] : [];
    }) }];
  });
  if (!Array.isArray(data)) issues.push("El JSON debe contener un array de semanas.");
  return { weeks: weeks.sort((a, b) => a.number - b.number), issues };
}
const normalized = normalizeWeeks(weekData);
export const cuaderno = normalized.weeks;
export const cuadernoIssues = normalized.issues;

export function getWeekBibliography(week: Week): BibliographyEntry[] {
  if (week.bibliography?.length) return week.bibliography;

  const legacy = week.activities.flatMap((activity) => activity.references.flatMap((reference, index) => {
    const entry = citation(reference, `${activity.id}-ref-${index}`);
    return entry ? [entry] : [];
  }));
  return legacy.filter(
    (entry, index, entries) => entries.findIndex((other) => (other.url ?? other.id) === (entry.url ?? entry.id)) === index,
  );
}

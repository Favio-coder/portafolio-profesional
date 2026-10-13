import weekData from "./cuaderno.json";
import { bibliography, type BibliographyEntry } from "./bibliography";

export interface Evidence {
  type: "image" | "link" | "file" | "repository";
  title: string;
  url: string;
  description?: string;
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
  reflection: {
    whatLearned: string;
    howLearned: string;
  };
  references: string[];
  evidence: Evidence[];
  tools?: string[];
  code?: string;
}

export interface Reflection {
  whatLearned?: string;
  howLearned?: string;
  difficulties?: string;
  solutions?: string;
  improvements?: string;
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
  topics?: string[];
  evidence?: Evidence[];
  reflection?: Reflection;
  bibliography?: string[];
}

export const cuaderno: Week[] = weekData as Week[];

// Compatibilidad: fuentes antiguas con asociación explícita de semana.
export function getWeekBibliography(week: Week): BibliographyEntry[] {
  const legacy = week.activities.flatMap((activity) =>
    activity.references.map((reference, index) => {
      const url = reference.match(/https?:\/\/\S+/)?.[0];
      return {
        id: `${activity.id}-ref-${index}`,
        type: "web" as const,
        title: url ? reference.replace(url, "").replace(/:\s*$/, "") : reference,
        url,
      };
    }),
  );

  const weekBib = (week.bibliography ?? []).map((citation, index) => ({
    id: `${week.id}-bib-${index}`,
    type: "web" as const,
    title: citation,
    url: citation.match(/https?:\/\/\S+/)?.[0],
  }));

  return [...weekBib, ...bibliography.filter((entry) => entry.weekNumbers?.includes(week.number)), ...legacy].filter(
    (entry, index, entries) =>
      entries.findIndex((other) => (other.url ?? other.id) === (entry.url ?? entry.id)) === index,
  );
}

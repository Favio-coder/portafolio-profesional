export type BibliographyType = "book" | "web";

export interface BibliographyEntry {
  id: string;
  type: BibliographyType;
  title: string;
  author?: string;
  year?: string;
  url?: string;
  description?: string;
  weekNumbers?: number[];
}

export const bibliography: BibliographyEntry[] = [
  {
    id: "bib-01",
    type: "book",
    title: "Eloquent JavaScript: A Modern Introduction to Programming",
    author: "Marijn Haverbeke",
    year: "2018",
    description: "Fundamentos de JavaScript moderno, programación funcional y asíncrona.",
    weekNumbers: [1, 2],
  },
  {
    id: "bib-02",
    type: "book",
    title: "Learning React: Modern Patterns for Developing React Apps",
    author: "Alex Banks, Eve Porcello",
    year: "2021",
    description: "Hooks, contexto, patrones de composición y testing en React.",
    weekNumbers: [2],
  },
  {
    id: "bib-03",
    type: "book",
    title: "TypeScript Handbook",
    author: "Microsoft",
    year: "2024",
    url: "https://www.typescriptlang.org/docs/handbook/intro.html",
    description: "Guía oficial de TypeScript: tipos, interfaces, generics, utility types.",
    weekNumbers: [2],
  },
  {
    id: "bib-04",
    type: "book",
    title: "Next.js Documentation - App Router",
    author: "Vercel",
    year: "2024",
    url: "https://nextjs.org/docs/app",
    description: "Server Components, Server Actions, Streaming, Parallel Routes, Intercepting Routes.",
    weekNumbers: [3],
  },
  {
    id: "bib-05",
    type: "web",
    title: "MDN Web Docs - HTML Semantics",
    author: "Mozilla Contributors",
    year: "2024",
    url: "https://developer.mozilla.org/en-US/docs/Glossary/Semantics",
    description: "Elementos semánticos, accesibilidad y estructura de documentos.",
    weekNumbers: [1],
  },
  {
    id: "bib-06",
    type: "web",
    title: "CSS-Tricks - Complete Guide to Grid",
    author: "Chris House",
    year: "2024",
    url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
    description: "CSS Grid layout: grid-template, auto-placement, alignment, responsive patterns.",
    weekNumbers: [1],
  },
  {
    id: "bib-07",
    type: "web",
    title: "Tailwind CSS Documentation",
    author: "Tailwind Labs",
    year: "2024",
    url: "https://tailwindcss.com/docs",
    description: "Utility-first CSS: configuración, dark mode, responsive, plugins.",
    weekNumbers: [3],
  },
  {
    id: "bib-08",
    type: "web",
    title: "React Hooks Reference",
    author: "React Team",
    year: "2024",
    url: "https://react.dev/reference/react",
    description: "useState, useEffect, useContext, useReducer, useMemo, useCallback, custom hooks.",
    weekNumbers: [2],
  },
  {
    id: "bib-09",
    type: "web",
    title: "GitHub Docs - Conventional Commits",
    author: "GitHub",
    year: "2024",
    url: "https://github.com/conventional-commits/conventionalcommits.org",
    description: "Especificación de commits semánticos para historial legible y changelogs automáticos.",
    weekNumbers: [1],
  },
  {
    id: "bib-10",
    type: "web",
    title: "Web.dev - Learn Accessibility",
    author: "Google Chrome Team",
    year: "2024",
    url: "https://web.dev/learn/accessibility/",
    description: "Semántica, ARIA, focus management, testing con screen readers.",
    weekNumbers: [1, 2, 3],
  },
  {
    id: "bib-11",
    type: "book",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    year: "2017",
    description: "Arquitectura de sistemas de datos: storage, encoding, replication, partitioning, consistency.",
    weekNumbers: [2, 3],
  },
  {
    id: "bib-12",
    type: "web",
    title: "shadcn/ui Documentation",
    author: "shadcn",
    year: "2024",
    url: "https://ui.shadcn.com/docs",
    description: "Componentes accesibles construidos con Radix UI y Tailwind CSS.",
    weekNumbers: [3],
  },
];
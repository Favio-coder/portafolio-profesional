This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Cuaderno semanal

La fuente editable es `src/data/cuaderno.json`. Agrega un objeto al array para
crear otra semana; el selector ordena por `number`, sin cambios de componentes.

```json
{
  "id": "semana-04",
  "number": 4,
  "title": "[ADD_TITLE]",
  "description": "[ADD_SUMMARY]",
  "date": "",
  "status": "pendiente",
  "objectives": [],
  "topics": [],
  "activities": [],
  "evidence": [],
  "reflection": {
    "whatLearned": "",
    "howLearned": "",
    "difficulties": "",
    "solutions": "",
    "improvements": ""
  },
  "bibliography": []
}
```

- Estados: `pendiente`, `en progreso`, `completada`. Los registros antiguos sin
  estado se muestran como pendientes; las fechas vacías muestran `[ADD_DATE]`.
- `summary` es opcional; en su ausencia se usa `description`.
- Temas: `{ "title": "…", "explanation": "…", "definitions": [], "procedures": [] }`.
- Actividades: se conservan `id`, `title`, `description`, `learnedTopics`,
  `procedures`, `labExercises`, `labDevelopment`, `labResults`, `reflection`,
  `references`, `evidence`. Admiten también `tools: []` y `code: "…"` opcionales.
- Evidencias: `{ "type": "image", "title": "…", "url": "…", "description": "…" }`.
  Tipos: `image`, `file`, `link`, `repository`. Usa rutas de archivos existentes.
- Bibliografía: `{ "id": "ref-04", "type": "web", "title": "…", "url": "…" }`.
  Tipos: `book` y `web`; admite `author`, `year` y `description`. Sin videos.
- Compatibilidad: `src/data/cuaderno.ts` mantiene los exports originales. Las
  referencias de actividades y las fuentes de `bibliography.ts` se reúnen por
  su asociación explícita de semana, conservando el contenido original.
- La reflexión previa sin semana se conserva en `src/data/unassigned-reflection.ts`
  y en un archivo desplegable al pie. Para asignarla, copia el contenido a la
  semana correspondiente cuando conozcas esa asociación.
- Buscar incluye títulos de semanas, resúmenes, títulos de actividades y temas.
  Anterior/siguiente recorre las semanas que coinciden con los filtros activos.

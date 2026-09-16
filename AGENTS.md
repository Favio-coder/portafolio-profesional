# Portfolio — Favio Asturimac

## 1. Contexto

Estoy construyendo mi portfolio personal utilizando:

* Next.js
* React
* TypeScript
* Tailwind CSS
* Motion
* Lenis
* shadcn/ui
* Lucide React

El proyecto ya está creado y tiene esta estructura:

```text
src/
├── app
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Experience.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   └── ui/
│       ├── button.tsx
│       ├── dialog.tsx
│       └── tooltip.tsx
│
├── data
│   └── project.ts
│
└── lib
    └── utils.ts
```

No quiero una implementación genérica de portfolio.

Quiero una experiencia visual inspirada en:

* terminales antiguas
* sistemas operativos retro
* interfaces CLI
* computación de los años 80/90
* pixel art
* interfaces monocromáticas
* CRT
* ASCII
* command line
* sistemas de archivos
* estética tecnológica
* diseño editorial moderno

La referencia visual inicial es The Next Craft:

https://thenextcraft.org/es

No copiar diseños, código ni contenido literalmente.

La referencia debe servir únicamente para entender:

* ritmo visual
* minimalismo
* tipografía
* uso del espacio
* interacción
* storytelling mediante scroll
* sensación premium

---

# 2. Identidad

Nombre:

```text
Favio Asturimac
```

Profesión:

```text
Full Stack Developer
```

Ubicación:

```text
Peru
```

Identidad visual:

```text
Terminal
Retro
Tech
Pixel Art
Minimalista
Experimental
```

La página debe sentirse como:

```text
FAVIO_OS
```

o

```text
FAVIO.DEV
```

El visitante debería sentir que está explorando un sistema desarrollado por Favio.

---

# 3. Reglas generales

Antes de escribir código:

1. Revisar los archivos existentes.
2. No eliminar componentes existentes sin necesidad.
3. Reutilizar los componentes actuales.
4. Mejorar la arquitectura si es necesario.
5. Evitar colocar todo en `page.tsx`.
6. Cada sección importante debe tener su propio componente.
7. Mantener TypeScript correctamente tipado.
8. Mantener responsive design.
9. La experiencia móvil debe ser considerada desde el principio.
10. No instalar librerías innecesarias.
11. No utilizar componentes gigantes.
12. Separar contenido/data de la UI cuando sea conveniente.

---

# 4. Arquitectura deseada

La página principal debe tener:

```text
Navbar
│
├── Hero / Home
│
├── About
│
├── Projects
│
├── Gallery
│
└── Contact
│
Footer
```

La arquitectura recomendada:

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Gallery.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   │
│   └── ui/
│
├── data/
│   ├── projects.ts
│   └── gallery.ts
│
└── lib/
    └── utils.ts
```

---

# 5. Navbar

Crear/mejorar el Navbar existente.

Debe sentirse como una interfaz de terminal.

Ejemplo visual:

```text
~/FAVIO.DEV

01 ABOUT
02 PROJECTS
03 GALLERY
04 CONTACT

● SYSTEM ONLINE
```

En desktop:

```text
~/FAVIO.DEV          01 ABOUT   02 PROJECTS   03 GALLERY   04 CONTACT

                                                    ● ONLINE
```

En mobile:

```text
~/FAVIO.DEV                              MENU +
```

Al abrir:

```text
┌───────────────────────────────┐

FAVIO_OS

01 / ABOUT
02 / PROJECTS
03 / GALLERY
04 / CONTACT

STATUS:
● SYSTEM ONLINE

└───────────────────────────────┘
```

El Navbar debe:

* ser responsive
* tener microinteracciones
* tener hover states
* indicar visualmente los links
* poder cambiar ligeramente al hacer scroll
* mantener la estética terminal
* utilizar `Link` de Next.js cuando corresponda
* utilizar navegación por anchors para las secciones de la landing

---

# 6. HERO / HOME

El Hero debe ser la primera experiencia.

Ya existe:

```text
src/components/Hero.tsx
```

Mejorar ese componente en lugar de crear otro.

La composición debe mantener:

```text
FOTO                     INFORMACIÓN
                         00 / INTRO

                         Favio
                         Asturimac

                         FULL STACK DEVELOPER

                         descripción

                         terminal

                         botones
```

La fotografía principal está en:

```text
public/assets/images/FavioAsturimac.png
```

Existe también una versión pixel art:

```text
public/assets/images/PixelFavio.png
```

## Animación de fotografía

Crear una animación donde:

```text
FOTO NORMAL
     ↓
GLITCH
     ↓
PIXEL ART
     ↓
GLITCH
     ↓
FOTO NORMAL
```

Debe suceder automáticamente cada cierto tiempo.

No debe ser demasiado rápida ni molesta.

La transición debe sentirse como un cambio de modo del sistema.

Conceptualmente:

```text
[ IMAGE PROCESSING ]

FavioAsturimac.png

        ↓

[ PIXEL_MODE ]

PixelFavio.png

        ↓

[ RESTORING ]

FavioAsturimac.png
```

Mostrar pequeños textos técnicos durante la transición.

Por ejemplo:

```text
PROCESSING_IMAGE...
```

```text
SWITCHING_RENDER_MODE...
```

```text
PIXEL_MODE: ON
```

```text
RESTORING_IMAGE...
```

---

# 7. SOBRE MÍ / ABOUT

Crear/mejorar:

```text
src/components/About.tsx
```

Esta sección debe sentirse como ejecutar un comando.

Quiero algo visualmente similar a:

```text
01 / ABOUT

$ print("Descripcion")

> ██████████████████████████
> █
> █
> █
> █
```

El texto:

```text
print("Descripcion")
```

debe tener una animación de escritura/reveal.

Después aparece mi descripción.

IMPORTANTE:

No inventar la descripción personal definitiva.

Dejar un placeholder claramente identificable para que posteriormente yo pueda reemplazarlo.

Por ejemplo:

```ts
const aboutDescription = `
AQUÍ COLOCARÉ MI DESCRIPCIÓN PERSONAL.
`;
```

La UI debe animar la aparición del contenido.

La animación puede ser:

```text
$
p
pr
pri
prin
print
print(
print("
print("D
print("De
...
```

o una variante visual equivalente.

Cuando termine:

```text
print("Descripcion")

> Aquí aparecerá mi descripción...
> Aquí continuará mi presentación...
> ...
```

Agregar un pequeño cursor:

```text
_
```

que parpadee.

---

# 8. CONCEPTO VISUAL DE ABOUT

No quiero una tarjeta tradicional.

Evitar:

```text
┌───────────────────┐
│ About Me          │
│                   │
│ texto...          │
└───────────────────┘
```

En su lugar utilizar una estructura parecida a una terminal:

```text
┌──────────────────────────────────────────────┐
│ FAVIO_OS / ABOUT                             │
├──────────────────────────────────────────────┤
│                                              │
│ $ print("Descripcion")                       │
│                                              │
│ > Soy desarrollador...                       │
│ > ...                                        │
│ > ...                                        │
│                                              │
│ _                                            │
│                                              │
└──────────────────────────────────────────────┘
```

Pero mantener un diseño elegante y moderno.

No hacer que parezca una terminal falsa demasiado literal.

---

# 9. PROJECTS

Crear/mejorar:

```text
src/components/Projects.tsx
```

Quiero que esta sección tenga un concepto de:

# FILE SYSTEM

Visualmente:

```text
02 / PROJECTS

$ tree ./projects

projects/
│
├── project_01/
│   ├── README.md
│   ├── stack.json
│   └── preview.png
│
├── project_02/
│   ├── README.md
│   ├── stack.json
│   └── preview.png
│
└── project_03/
    ├── README.md
    ├── stack.json
    └── preview.png
```

Cada proyecto debe convertirse en una pieza visual interactiva.

Por ejemplo:

```text
projects/
│
├── EDUKO/
│   └── [ OPEN ]
│
├── PROJECT_02/
│   └── [ OPEN ]
│
└── PROJECT_03/
    └── [ OPEN ]
```

Al pasar el mouse sobre un proyecto:

* mostrar preview
* mover ligeramente el elemento
* mostrar stack
* mostrar año
* mostrar un indicador
* mostrar `OPEN →`

Debe sentirse como explorar archivos.

---

# 10. DATA DE PROJECTS

No hardcodear todos los proyectos dentro del JSX.

Crear:

```text
src/data/projects.ts
```

Utilizar una estructura similar a:

```ts
export interface Project {
  id: string;
  name: string;
  description: string;
  year: string;
  image: string;
  technologies: string[];
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    id: "project-01",
    name: "EDUKO",
    description: "Descripción del proyecto.",
    year: "2026",
    image: "/assets/images/projects/eduko.png",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
    ],
    github: "",
    demo: "",
  },
];
```

Yo posteriormente rellenaré los proyectos.

---

# 11. GALERÍA

Crear:

```text
src/components/Gallery.tsx
```

Esta sección debe ser visualmente diferente de Projects.

Concepto:

```text
03 / GALLERY

$ ls ./gallery

IMG_001
IMG_002
IMG_003
IMG_004
```

Quiero una galería retro/experimental.

No hacer simplemente:

```text
[ IMG ][ IMG ][ IMG ]
[ IMG ][ IMG ][ IMG ]
```

Quiero que parezca una colección de archivos/imágenes.

Por ejemplo:

```text
┌──────────────┐
│ IMG_001.PNG  │
│              │
│   IMAGE      │
│              │
└──────────────┘

┌────────────────────┐
│ IMG_002.PNG        │
│                    │
│      IMAGE         │
│                    │
└────────────────────┘
```

Las imágenes pueden tener tamaños diferentes.

Utilizar un layout tipo masonry/grid editorial.

---

# 12. DATA DE GALERÍA

Crear:

```text
src/data/gallery.ts
```

Quiero que la galería sea completamente configurable mediante JSON/TypeScript.

Ejemplo:

```ts
export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  category?: string;
  year?: string;
}

export const gallery: GalleryItem[] = [
  {
    id: "img-001",
    title: "FAVIO_001",
    image: "/assets/images/gallery/image-01.jpg",
    category: "PORTRAIT",
    year: "2026",
  },

  {
    id: "img-002",
    title: "FAVIO_002",
    image: "/assets/images/gallery/image-02.jpg",
    category: "WORK",
    year: "2026",
  },
];
```

Yo quiero poder agregar una imagen simplemente haciendo:

```ts
{
  id: "img-003",
  title: "FAVIO_003",
  image: "/assets/images/gallery/image-03.jpg",
  category: "OTHER",
  year: "2026",
}
```

sin tener que modificar el componente `Gallery.tsx`.

---

# 13. INTERACCIÓN DE GALERÍA

Al hacer hover:

```text
IMG_001.PNG

→ OPEN
```

La imagen puede:

* hacer zoom muy leve
* aparecer con una línea
* mostrar metadata
* mostrar un pequeño cursor
* tener una transición CRT/glitch sutil

Al hacer click:

abrir un modal/lightbox.

Se puede utilizar el componente:

```text
src/components/ui/dialog.tsx
```

si resulta apropiado.

---

# 14. CONTACT

Crear/mejorar:

```text
src/components/Contact.tsx
```

Concepto:

```text
04 / CONTACT

$ ./connect.sh

INITIALIZING CONNECTION...

[ EMAIL ]
[ GITHUB ]
[ LINKEDIN ]

STATUS:
● AVAILABLE
```

Debe ser simple.

No crear todavía un formulario complejo.

Dejar preparada la estructura para que posteriormente pueda colocar:

* email
* GitHub
* LinkedIn
* otras redes

---

# 15. FOOTER

Crear/mejorar:

```text
src/components/Footer.tsx
```

Concepto:

```text
────────────────────────────────────────────

FAVIO.DEV

BUILD: 2026
STATUS: ONLINE

© 2026 Favio Asturimac

────────────────────────────────────────────
```

---

# 16. ESTILO GLOBAL

Utilizar una estética basada principalmente en:

```text
#000000
#0a0a0a
#e6e3d9
```

Con un verde terminal como color de acento:

```text
#0ce642
```

No utilizar demasiados colores.

La interfaz debe sentirse:

* oscura
* minimalista
* tecnológica
* retro
* elegante
* experimental

---

# 17. TIPOGRAFÍA

Ya existe:

```text
Geist
Geist Mono
```

Utilizar `Geist Mono` principalmente para:

* comandos
* metadata
* números
* navegación
* etiquetas
* estados
* nombres de archivos

Utilizar Geist para:

* headings
* textos principales
* descripciones

---

# 18. ANIMACIONES

Utilizar las librerías ya instaladas cuando tengan sentido.

Preferencia:

```text
CSS
↓
Motion
↓
Canvas / técnicas avanzadas
```

No introducir GSAP únicamente por introducirlo.

Las animaciones deben ser:

* rápidas
* elegantes
* intencionales
* no invasivas

Utilizar animaciones para:

* reveal
* hover
* image glitch
* pixel transition
* terminal typing
* scroll reveal
* navegación
* modal
* cursor

---

# 19. RESPONSIVE

El diseño debe funcionar perfectamente en:

```text
Mobile
Tablet
Desktop
Large Desktop
```

En mobile:

* Navbar debe convertirse en menú.
* Hero debe pasar a una sola columna.
* Imagen debe reducirse correctamente.
* Projects debe adaptarse.
* Gallery debe utilizar una sola columna o grid apropiado.
* No debe haber overflow horizontal.

---

# 20. ACCESIBILIDAD

Mantener:

* `alt` correcto en imágenes.
* botones reales para acciones.
* navegación accesible.
* `aria-label` cuando sea necesario.
* buen contraste.
* soporte básico para `prefers-reduced-motion`.

Si el usuario tiene animaciones reducidas activadas, reducir o desactivar animaciones no esenciales.

---

# 21. SEO

Actualizar:

```text
src/app/layout.tsx
```

Metadata:

```ts
export const metadata: Metadata = {
  title: "Favio Asturimac — Full Stack Developer",
  description:
    "Portfolio personal de Favio Asturimac, Full Stack Developer.",
};
```

Mantener:

```html
<html lang="es">
```

---

# 22. PAGE.TSX

`src/app/page.tsx` debe mantenerse limpio.

Debe ser parecido a:

```tsx
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Gallery />
      <Contact />
    </main>
  );
}
```

No colocar JSX enorme dentro de `page.tsx`.

---

# 23. Orden final

La landing debe quedar:

```text
┌─────────────────────────────────────────────┐
│ NAVBAR                                      │
├─────────────────────────────────────────────┤
│                                             │
│ HERO                                        │
│                                             │
│ FOTO + FAVIO ASTURIMAC                     │
│ FULL STACK DEVELOPER                        │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│ 01 / ABOUT                                  │
│                                             │
│ $ print("Descripcion")                      │
│ > descripción...                            │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│ 02 / PROJECTS                               │
│                                             │
│ $ tree ./projects                            │
│                                             │
│ projects/                                   │
│ ├── project_01                              │
│ ├── project_02                              │
│ └── project_03                              │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│ 03 / GALLERY                                │
│                                             │
│ $ ls ./gallery                              │
│                                             │
│ [ images ]                                  │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│ 04 / CONTACT                                │
│                                             │
│ $ ./connect.sh                              │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│ FOOTER                                      │
│                                             │
└─────────────────────────────────────────────┘
```

---

# 24. IMPORTANTE — No completar información personal inventada

No inventar:

* experiencia laboral
* empresas
* proyectos
* tecnologías que no haya confirmado
* estudios
* premios
* clientes
* redes sociales
* descripción personal

Cuando falte información, utilizar placeholders claros:

```text
[ADD_DESCRIPTION]
```

```text
[ADD_PROJECT]
```

```text
[ADD_GITHUB]
```

```text
[ADD_LINKEDIN]
```

Yo proporcionaré posteriormente la información real.

---

# 25. Resultado esperado

Quiero que el resultado NO parezca:

```text
Portfolio template #234
```

Debe parecer una experiencia personalizada:

```text
FAVIO.DEV

A DIGITAL SYSTEM
BUILT BY FAVIO

---------------------------------

01 / ABOUT

$ print("Descripcion")

---------------------------------

02 / PROJECTS

$ tree ./projects

---------------------------------

03 / GALLERY

$ ls ./gallery

---------------------------------

04 / CONTACT

$ ./connect.sh
```

Debe combinar:

**retro computing + terminal + pixel art + diseño editorial + web moderna.**

Priorizar una experiencia visual coherente sobre agregar demasiados efectos.

Antes de finalizar, revisar que:

```bash
npm run lint
```

no tenga errores y que:

```bash
npm run build
```

compile correctamente.

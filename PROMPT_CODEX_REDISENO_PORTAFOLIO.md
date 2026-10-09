# PROMPT MAESTRO PARA CODEX — REDISEÑO DEL PORTAFOLIO

## Rol
Actúa como un **Creative Frontend Engineer, UI/UX Designer y especialista en motion design**. Trabaja directamente sobre el repositorio existente. El objetivo es rediseñar y desarrollar, no limitarte a escribir sugerencias.

## Contexto y referencias
- Portafolio actual: https://portafolio-profesional-pi.vercel.app/
- Inspiración estética: https://thenextcraft.org/es
- Toma como referencia el lenguaje visual de The Next Craft: estética retrocomputacional, comandos BASIC, titulares de gran escala, bandas tipográficas repetidas como TRACKS, contrastes, grillas y ritmo editorial.
- **No clones la página** ni reutilices sus logos, textos, fotografías o código. Diseña una identidad original para un portafolio profesional.
- Perfil: estudiante de IX ciclo de Ingeniería de Sistemas; desarrollador full stack interesado en cloud, ingeniería de datos, IA, arquitectura de software, innovación y hackathons. Hay experiencia profesional y formación CAPM®, pero verifica el contenido real del repositorio antes de publicarlo.

## Objetivo de diseño
Transformar el portafolio oscuro y de estética terminal en una experiencia **retro-futurista, editorial, experimental, interactiva y mayormente clara**. Debe verse como el sitio de un ingeniero de software que construye productos reales, no como una landing genérica de plantilla ni como una página de videojuegos.

### Dirección visual
- Fondo dominante crema cálido `#F3F0E8` o blanco hueso `#FAF7F0`.
- Texto principal carbón `#1A1A1A`.
- Acento naranja coral `#FF633E` y verde lima `#C7FF58`, con uso moderado.
- Secciones oscuras solo para crear contraste y ritmo, nunca todo el sitio.
- Grillas finas, bordes definidos, numeración, etiquetas técnicas, microcopy inspirado en CLI/BASIC, divisores editoriales, grandes márgenes y espacios en blanco.
- Evitar exceso de glow, neón, gradientes morados, glassmorphism, sombras pesadas y tarjetas SaaS genéricas.

### Tipografías
Elegir y probar una combinación con licencias apropiadas y carga optimizada:
- Display: Space Grotesk, Archivo Black, Syne o alternativa editorial contundente.
- Texto: Inter, DM Sans o Manrope.
- Mono: IBM Plex Mono o JetBrains Mono para comandos, etiquetas y metadatos.
- Usar `clamp()` para escalado fluido, jerarquía clara y evitar texto desbordado en móviles.
- Limitar familias/pesos para cuidar rendimiento.

## FASE 0 — Auditoría antes de editar
1. Inspecciona estructura, framework, rutas, estilos, dependencias, componentes, assets y contenido existente.
2. Identifica animaciones actuales, restricciones de despliegue y problemas responsive.
3. Revisa scripts de lint, tests y build.
4. Presenta un resumen breve del diagnóstico y un plan de archivos a modificar.
5. Conserva los enlaces reales, proyectos, información de contacto y funcionalidades. No inventes experiencias, métricas, certificaciones, premios ni URLs.
6. Si faltan datos, usa placeholders claramente marcados en una estructura de datos centralizada, sin publicarlos como hechos.

## FASE 1 — Design system
- Implementa tokens de color, tipografía, espaciado, bordes, radios y animación mediante CSS variables o la solución ya utilizada en el proyecto.
- Establece layouts fluidos con grid y contenedores adaptativos.
- Crea componentes reutilizables: SectionHeading, MarqueeBand, RevealText, ProjectCard, Tag, SectionDivider, MagneticLink (solo si aporta), TerminalLabel, BackToTop.
- Usa una escala tipográfica con títulos XL expresivos y texto legible.
- Mantén contraste WCAG AA para texto normal cuando corresponda.

## FASE 2 — Animación protagonista tipo TRACKS
**Prioridad máxima.** Crear una sección distintiva de bandas de texto gigantes y repetidas:
- Varias filas horizontales que digan, por ejemplo:
  `FULL STACK ✳ CLOUD ✳ DATA ✳ AI ✳ BUILD & SHIP ✳`
  `DESIGN · DEVELOP · DEPLOY · ITERATE ·`
- Filas alternadas moviéndose a izquierda y derecha en bucle continuo y sin saltos visibles.
- Repetir el contenido lo suficiente para un loop perfecto; usar duplicados `aria-hidden` para evitar ruido en lectores de pantalla.
- Variar ligeramente velocidad, dirección y tratamiento tipográfico entre filas.
- Activar la entrada al llegar a la sección mediante IntersectionObserver o el sistema de animación del stack.
- Efecto opcional de desaceleración sutil al hacer hover, sin depender del hover para funcionar.
- Evitar scroll horizontal en el documento y saltos de layout.
- Con `prefers-reduced-motion: reduce`, detener la animación y mantener el contenido estático y legible.
- No copiar literalmente TRACKS como identidad del portafolio: usar áreas y mensajes profesionales propios.

## FASE 3 — Hero renovado
- Header editorial claro con nombre/marca personal, navegación, indicador de disponibilidad solo si está confirmado, y CTA de contacto/CV.
- Hero con titular grande y original, por ejemplo `I BUILD THINGS THAT WORK.` acompañado de una descripción en español; no usarlo si no encaja con el tono final.
- Subtítulo breve y preciso: Full Stack · Cloud · Data · AI.
- Introducir comandos sutiles `> whoami`, `RUN PORTFOLIO`, `READY.` como detalles, no como sustitutos de la información.
- Animación de entrada escalonada del título, máscara/reveal y microinteracciones en botones.
- Indicador de scroll animado discreto.
- CTA primario: Ver proyectos. CTA secundario: Contacto / Descargar CV si existe archivo válido.
- No bloquear contenido detrás de una animación de carga prolongada.

## FASE 4 — Secciones del portafolio
### Sobre mí
- Presentación clara del perfil y propuesta de valor.
- Verificar IX ciclo, experiencia, certificaciones y formación con los datos existentes.
- Una sección tipo manifiesto, con una declaración contundente y una composición editorial.

### Experiencia
- Timeline o lista editorial con cargo, organización, período y responsabilidades verificadas.
- Resaltar resultados y tecnologías solo si están documentados.
- No publicar información confidencial de empleadores.

### Proyectos
- Destacar 3–4 proyectos principales con grandes imágenes reales, título, descripción de problema, rol, stack, arquitectura, resultados verificables y enlaces a demo/repositorio.
- Considerar EduKolea, Datathon BCP y otros proyectos existentes **solo tras verificar datos y permisos**.
- Mantener proyectos anteriores en una cuadrícula secundaria.
- Animar cada tarjeta al entrar al viewport con desplazamiento/opacity sutil, hover con imagen transformada y enlaces accesibles.
- Agregar filtros por Full Stack / Cloud / Data / AI solo si hay suficientes proyectos reales y la interacción aporta valor.

### Stack
- Presentar capacidades agrupadas por especialidad, no una pared de logos.
- Un marquee de tecnologías puede complementar, pero no duplicar ni competir con el marquee principal.

### Certificaciones, comunidad y galería
- Mostrar únicamente certificaciones reales verificadas.
- Incorporar experiencias de hackathons y comunidad con fotos autorizadas, contexto y enlaces.
- Galería editorial tipo mosaico, evitando imágenes de relleno y títulos genéricos.

### Contacto
- Cierre impactante con texto gigante `LET'S BUILD SOMETHING.` o una versión original en español.
- Enlaces funcionales a email, GitHub, LinkedIn y CV si existen.
- Botón de copiar email con feedback accesible, solo si el email es público y válido.

## FASE 5 — Motion design detallado
Implementar animaciones intencionales, con variedad y sin saturación:
1. Marquees infinitos alternados estilo TRACKS (prioridad 1).
2. Reveal por líneas o palabras en encabezados al hacer scroll.
3. Elementos que aparecen con stagger en proyectos y timeline.
4. Transiciones de color/fondo entre secciones, suaves y discretas.
5. Hover editorial en enlaces (subrayado deslizante, flechas, bordes).
6. Parallax muy sutil en imágenes seleccionadas, solo escritorio y si no perjudica rendimiento.
7. Separadores tipográficos gigantes y numeración de secciones.
8. Pequeño indicador de progreso de lectura opcional.
9. Cursor personalizado solo si es accesible, no invasivo y no perjudica touch ni selección de texto; omitir si no aporta.
10. Transiciones entre rutas solo si la arquitectura existente las soporta limpiamente.

Reglas: priorizar `transform` y `opacity`; evitar animar propiedades que causan reflow. Usar CSS para loops simples. Instalar Motion/Framer Motion o GSAP **solo si se justifica** según el stack; evitar añadir varias librerías de animación para lo mismo. Respetar `prefers-reduced-motion` globalmente. Evitar scroll hijacking.

## FASE 6 — Responsive, accesibilidad y performance
- Probar 360px, 390px, 768px, 1024px y 1440px.
- Asegurar menú móvil usable, enlaces con área táctil adecuada, ausencia de overflow horizontal y tipografías legibles.
- Imágenes responsivas y optimizadas, `loading=lazy` cuando corresponda, dimensiones explícitas para evitar CLS.
- Usar semántica HTML, navegación por teclado, foco visible, alt descriptivos y enlaces claros.
- Añadir SEO: title, description, Open Graph, favicon, canonical y metadatos según framework.
- Revisar LCP, CLS, INP y rendimiento de animaciones; evitar que las animaciones oculten contenido al fallar JS.
- Si hay i18n existente, conservarlo; no simular una versión inglesa incompleta.

## FASE 7 — Validación y entrega
1. Ejecutar instalación si es necesaria, lint, typecheck, tests y build con los scripts disponibles.
2. Corregir errores introducidos y revisar warnings relevantes.
3. Verificar enlaces internos/externos, mobile, teclado y reduced motion.
4. Entregar resumen de cambios por archivo, decisiones de diseño, dependencias agregadas, pruebas ejecutadas y resultados.
5. Incluir instrucciones para ejecutar localmente y desplegar en Vercel.
6. Si no se dispone de navegador visual, indicarlo claramente y describir qué debe revisarse manualmente.

## Criterios de aceptación
- El sitio es predominantemente claro, legible y profesional.
- Tiene una identidad retrocomputacional/editorial propia inspirada en la referencia sin clonarla.
- La animación de bandas tipográficas funciona en loop continuo, con filas alternadas y fallback de movimiento reducido.
- Hay variedad de animaciones, pero el contenido y los CTA siguen siendo prioritarios.
- La nueva tipografía y jerarquía mejoran sustancialmente la presentación.
- No se pierde contenido ni se inventa información.
- No aparecen errores de compilación, overflow horizontal o interacciones rotas.
- El resultado se ve intencional y atractivo tanto en móvil como en escritorio.

## Modo de trabajo de Codex
**Implementa los cambios en el código, por fases.** Primero audita y luego ejecuta. No reemplaces el proyecto entero ni cambies de framework sin una justificación técnica sólida. Realiza cambios pequeños, coherentes y verificables. Si encuentras ambigüedades sobre información profesional, conserva los datos existentes o deja TODO explícitos. Prioriza terminar un sitio funcional y pulido sobre acumular efectos experimentales.

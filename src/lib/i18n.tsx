"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Locale = "es" | "en";

export const LOCALES: Locale[] = ["es", "en"];
export const DEFAULT_LOCALE: Locale = "es";

type Translations = Record<string, string>;

const translations: Record<Locale, Translations> = {
  es: {
    // ---------- common ----------
    "common.openNewTab": "abrir enlace en una nueva pestaña",
    "common.copied": "Copiado",
    "common.copyEmail": "Copiar email",
    "common.viewCode": "Ver código de {name}",
    "common.viewDemo": "Ver demo de {name}",
    "common.expandImage": "Ampliar {title}",
    "common.closeImage": "Cerrar imagen",
    "common.prevImage": "Imagen anterior",
    "common.nextImage": "Imagen siguiente",
    "common.technologies": "Tecnologías",
    "common.all": "Todos",

    // ---------- nav ----------
    "nav.brand": "FAVIO.DEV",
    "nav.about": "SOBRE MÍ",
    "nav.experience": "EXPERIENCIA",
    "nav.projects": "PROYECTOS",
    "nav.cuaderno": "CUADERNO",
    "nav.gallery": "GALERÍA",
    "nav.contact": "CONTACTO",
    "nav.terminal": "TERMINAL",
    "nav.closeMenu": "Cerrar menú",
    "nav.openMenu": "Abrir menú",
    "nav.systemOnline": "SYSTEM ONLINE",
    "nav.langSwitch": "Cambiar idioma",

    // ---------- hero ----------
    "hero.home": "HOME",
    "hero.scrolling": "SCROLLING",
    "hero.ready": "READY",
    "hero.badgeFullStack": "FULL STACK",
    "hero.badgeCloud": "CLOUD",
    "hero.badgeDataEng": "DATA ENG",
    "hero.badgeAI": "AI / ML",
    "hero.description":
      "Desarrollo soluciones digitales integrando software, cloud, datos e inteligencia artificial.\nEnfoque en productos funcionales, escalables y orientados a resolver problemas reales.",
    "hero.viewProjects": "Ver Proyectos",
    "hero.contact": "Contacto",
    "hero.available": "DISPONIBLE PARA PROYECTOS",
    "hero.online": "ONLINE",
    "hero.imageLabel": "IMG_001 / FAVIO_ASTURIMAC",
    "hero.pixelMode": "PIXEL_MODE",
    "hero.portraitMode": "PORTRAIT_MODE",
    "hero.processingImage": "PROCESSING_IMAGE...",
    "hero.switchingRenderMode": "SWITCHING_RENDER_MODE...",
    "hero.restoringImage": "RESTORING_IMAGE...",
    "hero.bit8Render": "8BIT_RENDER",
    "hero.highRes": "HIGH_RES",
    "hero.scrollToExplore": "SCROLL TO EXPLORE",

    // ---------- about ----------
    "about.title": "SOBRE MÍ",
    "about.subtitle": "Perfil técnico y trayectoria profesional",
    "about.manifesto": "MANIFIESTO",
    "about.aboutFile": "FAVIO_ASTURIMAC / ABOUT.MD",
    "about.printDescription": 'print("Descripcion")',
    "about.description":
      "Estudiante de IX Ciclo de Ingeniería de Sistemas.\nDesarrollador Full Stack con interés en Cloud, Data Engineering e IA.\nExperiencia en hackathons, startups y productos reales.",
    "about.additional": "ADICIONAL",
    "about.additionalInfo":
      "Especializado en QA, data engineering, cloud computing y desarrollo full stack.\nDominio: React, Next.js, TypeScript, Python, Spring Boot, Laravel, AWS, Google Cloud, Azure.\nActualmente desarrollando Healthtech con Alzhivida y proyectos de IA con aprendizaje no supervisado.",
    "about.statsYears": "AÑOS EXPERIENCIA",
    "about.statsProjects": "PROYECTOS ENTREGADOS",
    "about.statsTech": "TECNOLOGÍAS DOMINADAS",
    "about.statsHackathons": "HACKATHONS",
    "about.techStack": "STACK_TECNOLÓGICO",
    "about.currentFocus": "ENFOQUE ACTUAL",
    "about.certifications": "CERTIFICACIONES",
    "about.viewCert": "Ver certificación {name} (abre en otra pestaña)",

    // ---------- experience ----------
    "experience.title": "EXPERIENCIA",
    "experience.subtitle": "Desarrollo, calidad de software, datos y soluciones cloud",
    "experience.trayectoria": "TRAYECTORIA",
    "experience.keyAchievements": "APORTES DESTACADOS",
    "experience.hackathonsAwards": "HACKATHONS & RECONOCIMIENTOS",
    "experience.openNewTab": "abrir enlace en una nueva pestaña",

    // ---------- projects ----------
    "projects.title": "PROYECTOS",
    "projects.subtitle": "Trabajos seleccionados — software, cloud, data e IA",
    "projects.filesystem": "FILE_SYSTEM",
    "projects.filterAria": "Filtrar proyectos por tecnología",
    "projects.status": "{filtered} archivos / {total} proyectos",
    "projects.moreGitHub": "Más proyectos en GitHub ↗",
    "projects.viewCode": "Ver código",
    "projects.viewDemo": "Ver demo",

    // ---------- gallery ----------
    "gallery.title": "GALERÍA",
    "gallery.subtitle": "Colección visual — trabajo, vida, experimentos",
    "gallery.lsGallery": "LS_GALLERY",
    "gallery.filterAria": "Filtrar galería",
    "gallery.all": "TODOS",
    "gallery.photoSession": "Sesión Fotográfica",
    "gallery.category.personal": "PERSONAL",
    "gallery.category.trabajo": "TRABAJO",
    "gallery.category.otro": "OTRO",
    "gallery.expandImage": "Ampliar {title}",
    "gallery.closeImage": "Cerrar imagen",
    "gallery.prevImage": "Imagen anterior",
    "gallery.nextImage": "Imagen siguiente",

    // ---------- contact ----------
    "contact.title": "CONTACTO",
    "contact.subtitle": "Conectemos y construyamos algo juntos",
    "contact.connectSh": "CONNECT.SH",
    "contact.initConnecting": "INITIALIZING CONNECTION...",
    "contact.availableStatus": "STATUS: AVAILABLE FOR NEW PROJECTS",
    "contact.ctaBlock": "CTA_BLOCK",
    "contact.ctaHeadline1": "CONSTRUYAMOS",
    "contact.ctaHeadline2": "ALGO JUNTOS.",
    "contact.ctaBody":
      "¿Tienes un proyecto en mente? ¿Necesitas ayuda con arquitectura cloud, pipelines de datos o desarrollo full stack? Hablemos.",
    "contact.whatsapp": "Conversemos por WhatsApp",
    "contact.sendEmail": "Enviar Email",
    "contact.availability": "DISPONIBILIDAD",
    "availability.freelance": "Freelance / Contract",
    "availability.fulltime": "Full-time Remote",
    "availability.consulting": "Consultoría Técnica",
    "availability.mentoring": "Mentorías / Charlas",
    "status.open": "Abierto",
    "status.consult": "Consultar",
    "contact.location": "UBICACIÓN / ZONA HORARIA",
    "contact.locationValue": "Huancayo, Perú",
    "contact.timezone": "GMT-5 (America/Lima)",
    "contact.remote": "Remoto global — Inglés/ Español",
    "contact.quickLinks": "QUICK LINKS",
    "contact.cvComingSoon": "CV · próximamente",

    // ---------- footer ----------
    "footer.systemInfo": "SYSTEM_INFO",
    "footer.role": "Full Stack Developer",
    "footer.bio": "Construyendo productos digitales en la intersección de software, cloud, datos e IA.",
    "footer.navigation": "NAVEGACIÓN",
    "footer.navAbout": "Sobre mí",
    "footer.navExperience": "Experiencia",
    "footer.navProjects": "Proyectos",
    "footer.navGallery": "Galería",
    "footer.navContact": "Contacto",
    "footer.connect": "CONECTAR",
    "footer.build": "BUILD: {year}",
    "footer.statusOnline": "STATUS: ONLINE",
    "footer.madeWith": "HECHO CON AMOR Y MUCHO CAFÉ :3",

    // ---------- animated statement ----------
    "statement.text": "La curiosidad inicia el camino. Construir lo convierte en realidad.",
    "statement.cmd": "$ curiosity --build-reality",
    "statement.footer": "FAVIO.DEV / ALWAYS BUILDING",

    // ---------- technical tracks ----------
    "tracks.buildExploreDeploy": "BUILD ✦ EXPLORE ✦ DEPLOY ✦",
    "tracks.tracksFavioOs": "TRACKS ✦ FAVIO_OS ✦",
    "tracks.tracksLabel": "FAVIO_OS / TRACKS",
    "tracks.title1": "Tres tracks.",
    "tracks.title2": "Una misma curiosidad.",
    "tracks.01.title": "Desarrollo de software",
    "tracks.01.description": "Interfaces, APIs y aplicaciones.",
    "tracks.02.title": "Datos e inteligencia",
    "tracks.02.description": "Integración, análisis y BI.",
    "tracks.03.title": "Cloud y calidad",
    "tracks.03.description": "Infraestructura, automatización y testing.",

    // ---------- project card ----------
    "projectCard.ariaTechnologies": "Tecnologías",
    "projectCard.imageAlt": "Imagen asociada a {name}",

    // ---------- portfolio terminal ----------
    "terminal.welcome":
      "Bienvenido. Explora los archivos o salta a cualquier sección con <span class=\"text-[#0ce642]\">ir</span>. Escribe un comando y pulsa Enter.",
    "terminal.historyStart": "Tu historial comienza aquí.",
    "terminal.historyLabel": "Comando del terminal",
    "terminal.executeLabel": "Ejecutar comando",
    "terminal.expand": "Maximizar terminal",
    "terminal.restore": "Restaurar tamaño",
    "terminal.close": "Cerrar terminal",
    "terminal.statusBar": "↑ ↓ HISTORIAL / TAB COMPLETAR / ESC SALIR",
    "terminal.help": "NAVEGA MÁS RÁPIDO POR FAVIO_OS\n\nir <sección>       Abre una sección del portafolio\nls                 Muestra todas las secciones\ncuaderno           Explora semanas y actividades en árbol\nir cuaderno 3      Abre directamente la semana 3\nprojects           Lista proyectos y tecnologías reales\ngallery            Explora el índice de fotografías\nwhoami             Revela mi retrato en caracteres\nhelp               Vuelve a mostrar esta guía\nclear / exit       Limpia la pantalla / cierra el terminal\n\nTambién puedes usar cd o open en lugar de ir.\n↑ ↓ historial · Tab autocompleta · Esc cierra\nPista: los archivos ocultos aparecen con ls -a.",
    "terminal.prompt": "visitante@favio:~$",
    "terminal.placeholder": "help, whoami, ir projects…",

    // ---------- spotify ----------
    "spotify.close": "Cerrar Spotify",
    "spotify.openSpotify": "Abrir en Spotify",
    "spotify.newTab": "(nueva pestaña)",
    "spotify.hide": "Ocultar Spotify",
    "spotify.show": "Abrir Spotify",
    "spotify.panelLabel": "Reproductor de Spotify",
    "spotify.iframeTitle": "Playlist de Favio en Spotify",

    // ---------- experience data ----------
    "exp.bst-data-quality.role": "Colaborador en Data Quality",
    "exp.bst-data-quality.company": "Proyecto vinculado a BST Global",
    "exp.bst-data-quality.period": "Colaboración de 2 meses",
    "exp.bst-data-quality.type": "Colaboración independiente",
    "exp.bst-data-quality.description":
      "Colaboración en calidad de datos mediante la revisión de pipelines y procedimientos almacenados. Preparé casos de prueba y realicé testing con Azure DevOps para verificar el comportamiento de los procesos.",
    "exp.bst-data-quality.achievement-0": "Revisé pipelines de datos en Apache Airflow.",
    "exp.bst-data-quality.achievement-1": "Analicé procedimientos almacenados y su lógica de procesamiento.",
    "exp.bst-data-quality.achievement-2": "Realicé testing de procesos de datos con Azure DevOps.",
    "exp.bst-data-quality.achievement-3": "Creé casos de prueba para verificar pipelines y procedimientos almacenados.",
    "exp.spaceag.role": "Customer Success Intern",
    "exp.spaceag.company": "SpaceAg",
    "exp.spaceag.period": "Set. 2025 — Jul. 2026",
    "exp.spaceag.location": "Huancayo, Perú",
    "exp.spaceag.type": "Business Intelligence",
    "exp.spaceag.description":
      "Desarrollo de dashboards, indicadores y procesos de consolidación de datos para empresas agroexportadoras. Transformé necesidades de negocio en reportes analíticos, integrando fuentes y validando la consistencia de la información.",
    "exp.spaceag.achievement-0": "Desarrollé dashboards y marcos de KPI para monitorear la generación de valor.",
    "exp.spaceag.achievement-1": "Automaticé la consolidación de datos e informes con SQL, Google Sheets y procesos ETL.",
    "exp.spaceag.achievement-2": "Utilicé AWS Athena, Simba Athena e integraciones de API para consultar y actualizar información.",
    "exp.spaceag.achievement-3": "Diseñé modelos dimensionales de estrella y copo de nieve.",
    "exp.spaceag.achievement-4": "Validé datos y reportes mediante pruebas funcionales, de regresión y controles automatizados.",
    "exp.hospital-bi.role": "Desarrollador de solución BI",
    "exp.hospital-bi.company": "Hospital Nacional Ramiro Prialé — Red Asistencial Junín",
    "exp.hospital-bi.period": "Set. 2025 — Jul. 2026",
    "exp.hospital-bi.location": "Huancayo, Perú",
    "exp.hospital-bi.type": "Proyección social",
    "exp.hospital-bi.description":
      "Desarrollo de una solución de Business Intelligence para centralizar información sobre el consumo de recursos en diagnóstico por imágenes. Integré procesamiento de datos, reportes y pruebas de calidad y rendimiento.",
    "exp.hospital-bi.achievement-0": "Implementé la solución con Angular, Django y MariaDB.",
    "exp.hospital-bi.achievement-1": "Desarrollé procesos ETL y validaciones automatizadas para controlar la integridad de los datos.",
    "exp.hospital-bi.achievement-2": "Ejecuté pruebas end-to-end sobre los flujos críticos del sistema.",
    "exp.hospital-bi.achievement-3": "Realicé pruebas de estrés y rendimiento con JMeter para evaluar la respuesta ante concurrencia.",
    "exp.c34.role": "Desarrollador Full Stack Junior y Soporte de TI",
    "exp.c34.company": "C34",
    "exp.c34.period": "Ene. 2025 — Dic. 2025",
    "exp.c34.location": "Huancayo, Perú",
    "exp.c34.type": "Software empresarial",
    "exp.c34.description":
      "Desarrollo de módulos para un sistema contable y soporte de infraestructura de TI. Trabajé con lógica de negocio, persistencia de datos, pruebas y documentación técnica para productos de facturación electrónica.",
    "exp.c34.achievement-0": "Desarrollé módulos contables con Laravel, Vue.js y SQL Server.",
    "exp.c34.achievement-1": "Implementé pruebas unitarias e integración para validar funcionalidades.",
    "exp.c34.achievement-2": "Elaboré documentación técnica con Astro y Starlight.",
    "exp.c34.achievement-3": "Integré servicios cloud y brindé soporte de red y dispositivos POS.",
    "exp.c34.achievement-4": "Apliqué prácticas de seguridad tomando como referencia OWASP Top 10 e ISO 27001.",
    "exp.dev-stream.role": "Full Stack Developer Intern",
    "exp.dev-stream.company": "Dev Stream",
    "exp.dev-stream.period": "Ene. 2024 — Abr. 2024",
    "exp.dev-stream.location": "Lima, Perú",
    "exp.dev-stream.type": "Prácticas",
    "exp.dev-stream.description":
      "Participación en proyectos web y formación en bases de datos, microservicios y DevOps. Colaboré en equipos Scrum, validando APIs y revisando la calidad del código.",
    "exp.dev-stream.achievement-0": "Participé en proyectos con Spring Boot, PostgreSQL y Angular.",
    "exp.dev-stream.achievement-1": "Validé APIs REST y microservicios mediante Postman.",
    "exp.dev-stream.achievement-2": "Analicé mantenibilidad y vulnerabilidades con SonarQube.",
    "exp.dev-stream.achievement-3": "Utilicé AWS EC2 y S3 para despliegue y almacenamiento.",
    "exp.rec.transformagob.name": "Hackathon Transformagob — PCM",
    "exp.rec.transformagob.position": "2.º lugar",
    "exp.rec.transformagob.focus": "Innovación y transformación digital",
    "exp.rec.concempi.name": "CONCEMPI V — PMI Lima",
    "exp.rec.concempi.position": "Ganador",
    "exp.rec.concempi.focus": "Competencia nacional de proyectos",
    "exp.rec.credicorp.name": "Credicorp Voices Awards",
    "exp.rec.credicorp.position": "Top 50",
    "exp.rec.credicorp.focus": "Finalista",
    "exp.rec.harvard-upch.name": "Hackathon Harvard con apoyo de UPCH",
    "exp.rec.harvard-upch.position": "Ganador",
    "exp.rec.harvard-upch.focus": "Innovación",
    "exp.rec.nasa-space-apps.name": "NASA Space Apps Challenge — Universidad Continental",
    "exp.rec.nasa-space-apps.position": "3.er lugar",
    "exp.rec.nasa-space-apps.focus": "Tecnología y datos espaciales",
    "exp.rec.impact-startup.name": "Impact Start Up Competition",
    "exp.rec.impact-startup.position": "3.er lugar",
    "exp.rec.impact-startup.focus": "Scale Incubator / UNT",
  },
  en: {
    // ---------- common ----------
    "common.openNewTab": "open link in a new tab",
    "common.copied": "Copied",
    "common.copyEmail": "Copy email",
    "common.viewCode": "View code of {name}",
    "common.viewDemo": "View demo of {name}",
    "common.expandImage": "Expand {title}",
    "common.closeImage": "Close image",
    "common.prevImage": "Previous image",
    "common.nextImage": "Next image",
    "common.technologies": "Technologies",
    "common.all": "All",

    // ---------- nav ----------
    "nav.brand": "FAVIO.DEV",
    "nav.about": "ABOUT ME",
    "nav.experience": "EXPERIENCE",
    "nav.projects": "PROJECTS",
    "nav.cuaderno": "NOTEBOOK",
    "nav.gallery": "GALLERY",
    "nav.contact": "CONTACT",
    "nav.terminal": "TERMINAL",
    "nav.closeMenu": "Close menu",
    "nav.openMenu": "Open menu",
    "nav.systemOnline": "SYSTEM ONLINE",
    "nav.langSwitch": "Change language",

    // ---------- hero ----------
    "hero.home": "HOME",
    "hero.scrolling": "SCROLLING",
    "hero.ready": "READY",
    "hero.badgeFullStack": "FULL STACK",
    "hero.badgeCloud": "CLOUD",
    "hero.badgeDataEng": "DATA ENG",
    "hero.badgeAI": "AI / ML",
    "hero.description":
      "I build digital solutions integrating software, cloud, data, and artificial intelligence.\nFocused on functional, scalable products oriented to solving real problems.",
    "hero.viewProjects": "View Projects",
    "hero.contact": "Contact",
    "hero.available": "AVAILABLE FOR PROJECTS",
    "hero.online": "ONLINE",
    "hero.imageLabel": "IMG_001 / FAVIO_ASTURIMAC",
    "hero.pixelMode": "PIXEL_MODE",
    "hero.portraitMode": "PORTRAIT_MODE",
    "hero.processingImage": "PROCESSING_IMAGE...",
    "hero.switchingRenderMode": "SWITCHING_RENDER_MODE...",
    "hero.restoringImage": "RESTORING_IMAGE...",
    "hero.bit8Render": "8BIT_RENDER",
    "hero.highRes": "HIGH_RES",
    "hero.scrollToExplore": "SCROLL TO EXPLORE",

    // ---------- about ----------
    "about.title": "ABOUT ME",
    "about.subtitle": "Technical profile and professional journey",
    "about.manifesto": "MANIFESTO",
    "about.aboutFile": "FAVIO_ASTURIMAC / ABOUT.MD",
    "about.printDescription": 'print("Description")',
    "about.description":
      "IX Cycle Systems Engineering Student.\nFull Stack Developer interested in Cloud, Data Engineering, and AI.\nExperience in hackathons, startups, and real products.",
    "about.additional": "ADDITIONAL",
    "about.additionalInfo":
      "Specialized in QA, data engineering, cloud computing, and full stack development.\nStack: React, Next.js, TypeScript, Python, Spring Boot, Laravel, AWS, Google Cloud, Azure.\nCurrently developing Healthtech with Alzhivida and AI projects with unsupervised learning.",
    "about.statsYears": "YEARS OF EXPERIENCE",
    "about.statsProjects": "PROJECTS DELIVERED",
    "about.statsTech": "TECHNOLOGIES MASTERED",
    "about.statsHackathons": "HACKATHONS",
    "about.techStack": "TECH STACK",
    "about.currentFocus": "CURRENT FOCUS",
    "about.certifications": "CERTIFICATIONS",
    "about.viewCert": "View certification {name} (opens in a new tab)",

    // ---------- experience ----------
    "experience.title": "EXPERIENCE",
    "experience.subtitle": "Software development, quality, data, and cloud solutions",
    "experience.trayectoria": "CAREER PATH",
    "experience.keyAchievements": "KEY ACHIEVEMENTS",
    "experience.hackathonsAwards": "HACKATHONS & AWARDS",
    "experience.openNewTab": "open link in a new tab",

    // ---------- projects ----------
    "projects.title": "PROJECTS",
    "projects.subtitle": "Selected works — software, cloud, data, and AI",
    "projects.filesystem": "FILE_SYSTEM",
    "projects.filterAria": "Filter projects by technology",
    "projects.status": "{filtered} files / {total} projects",
    "projects.moreGitHub": "More projects on GitHub ↗",
    "projects.viewCode": "View code",
    "projects.viewDemo": "View demo",

    // ---------- gallery ----------
    "gallery.title": "GALLERY",
    "gallery.subtitle": "Visual collection — work, life, experiments",
    "gallery.lsGallery": "LS_GALLERY",
    "gallery.filterAria": "Filter gallery",
    "gallery.all": "ALL",
    "gallery.photoSession": "Photo Session",
    "gallery.category.personal": "PERSONAL",
    "gallery.category.trabajo": "WORK",
    "gallery.category.otro": "OTHER",
    "gallery.expandImage": "Expand {title}",
    "gallery.closeImage": "Close image",
    "gallery.prevImage": "Previous image",
    "gallery.nextImage": "Next image",

    // ---------- contact ----------
    "contact.title": "CONTACT",
    "contact.subtitle": "Let's connect and build something together",
    "contact.connectSh": "CONNECT.SH",
    "contact.initConnecting": "INITIALIZING CONNECTION...",
    "contact.availableStatus": "STATUS: AVAILABLE FOR NEW PROJECTS",
    "contact.ctaBlock": "CTA_BLOCK",
    "contact.ctaHeadline1": "LET'S BUILD",
    "contact.ctaHeadline2": "SOMETHING TOGETHER.",
    "contact.ctaBody":
      "Do you have a project in mind? Need help with cloud architecture, data pipelines, or full stack development? Let's talk.",
    "contact.whatsapp": "Let's talk on WhatsApp",
    "contact.sendEmail": "Send Email",
    "contact.availability": "AVAILABILITY",
    "availability.freelance": "Freelance / Contract",
    "availability.fulltime": "Full-time Remote",
    "availability.consulting": "Technical Consulting",
    "availability.mentoring": "Mentorships / Talks",
    "status.open": "Open",
    "status.consult": "Consult",
    "contact.location": "LOCATION / TIME ZONE",
    "contact.locationValue": "Huancayo, Perú",
    "contact.timezone": "GMT-5 (America/Lima)",
    "contact.remote": "Global remote — English / Spanish",
    "contact.quickLinks": "QUICK LINKS",
    "contact.cvComingSoon": "CV · coming soon",

    // ---------- footer ----------
    "footer.systemInfo": "SYSTEM_INFO",
    "footer.role": "Full Stack Developer",
    "footer.bio": "Building digital products at the intersection of software, cloud, data, and AI.",
    "footer.navigation": "NAVIGATION",
    "footer.navAbout": "About me",
    "footer.navExperience": "Experience",
    "footer.navProjects": "Projects",
    "footer.navGallery": "Gallery",
    "footer.navContact": "Contact",
    "footer.connect": "CONNECT",
    "footer.build": "BUILD: {year}",
    "footer.statusOnline": "STATUS: ONLINE",
    "footer.madeWith": "MADE WITH LOVE AND LOTS OF COFFEE :3",

    // ---------- animated statement ----------
    "statement.text": "Curiosity starts the journey. Building makes it real.",
    "statement.cmd": "$ curiosity --build-reality",
    "statement.footer": "FAVIO.DEV / ALWAYS BUILDING",

    // ---------- technical tracks ----------
    "tracks.buildExploreDeploy": "BUILD ✦ EXPLORE ✦ DEPLOY ✦",
    "tracks.tracksFavioOs": "TRACKS ✦ FAVIO_OS ✦",
    "tracks.tracksLabel": "FAVIO_OS / TRACKS",
    "tracks.title1": "Three tracks.",
    "tracks.title2": "One curiosity.",
    "tracks.01.title": "Software Development",
    "tracks.01.description": "Interfaces, APIs, and applications.",
    "tracks.02.title": "Data and Intelligence",
    "tracks.02.description": "Integration, analysis, and BI.",
    "tracks.03.title": "Cloud and Quality",
    "tracks.03.description": "Infrastructure, automation, and testing.",

    // ---------- project card ----------
    "projectCard.ariaTechnologies": "Technologies",
    "projectCard.imageAlt": "Image associated with {name}",

    // ---------- portfolio terminal ----------
    "terminal.welcome":
      "Welcome. Explore files or jump to any section with <span class=\"text-[#0ce642]\">ir</span>. Type a command and press Enter.",
    "terminal.historyStart": "Your history starts here.",
    "terminal.historyLabel": "Terminal command",
    "terminal.executeLabel": "Execute command",
    "terminal.expand": "Maximize terminal",
    "terminal.restore": "Restore size",
    "terminal.close": "Close terminal",
    "terminal.statusBar": "↑ ↓ HISTORY / TAB COMPLETE / ESC EXIT",
    "terminal.help": "NAVIGATE FASTER THROUGH FAVIO_OS\n\nir <section>       Opens a portfolio section\nls                 Lists all sections\ncuaderno           Explore weeks and activities in a tree\nir cuaderno 3      Opens week 3 directly\nprojects           Lists real projects and technologies\ngallery            Explore the photo index\nwhoami             Reveals my ASCII portrait\nhelp               Show this guide again\nclear / exit       Clears the screen / closes the terminal\n\nYou can also use cd or open instead of ir.\n↑ ↓ history · Tab autocompletes · Esc exits\nTip: hidden files appear with ls -a.",
    "terminal.prompt": "visitante@favio:~$",
    "terminal.placeholder": "help, whoami, ir projects…",

    // ---------- spotify ----------
    "spotify.close": "Close Spotify",
    "spotify.openSpotify": "Open on Spotify",
    "spotify.newTab": "(new tab)",
    "spotify.hide": "Hide Spotify",
    "spotify.show": "Open Spotify",
    "spotify.panelLabel": "Spotify player",
    "spotify.iframeTitle": "Favio's Spotify playlist",

    // ---------- experience data ----------
    "exp.bst-data-quality.role": "Data Quality Collaborator",
    "exp.bst-data-quality.company": "Project linked to BST Global",
    "exp.bst-data-quality.period": "2-month collaboration",
    "exp.bst-data-quality.type": "Independent collaboration",
    "exp.bst-data-quality.description":
      "Data quality collaboration through pipeline and stored procedure review. I prepared test cases and performed testing with Azure DevOps to verify process behavior.",
    "exp.bst-data-quality.achievement-0": "I reviewed data pipelines in Apache Airflow.",
    "exp.bst-data-quality.achievement-1": "I analyzed stored procedures and their processing logic.",
    "exp.bst-data-quality.achievement-2": "I performed data process testing with Azure DevOps.",
    "exp.bst-data-quality.achievement-3": "I created test cases to verify pipelines and stored procedures.",
    "exp.spaceag.role": "Customer Success Intern",
    "exp.spaceag.company": "SpaceAg",
    "exp.spaceag.period": "Sep. 2025 — Jul. 2026",
    "exp.spaceag.location": "Huancayo, Perú",
    "exp.spaceag.type": "Business Intelligence",
    "exp.spaceag.description":
      "Development of dashboards, indicators, and data consolidation processes for agro-export companies. I turned business needs into analytical reports, integrating sources and validating information consistency.",
    "exp.spaceag.achievement-0": "I developed dashboards and KPI frameworks to monitor value generation.",
    "exp.spaceag.achievement-1": "I automated data consolidation and reports with SQL, Google Sheets, and ETL processes.",
    "exp.spaceag.achievement-2": "I used AWS Athena, Simba Athena, and API integrations to query and update information.",
    "exp.spaceag.achievement-3": "I designed star and snowflake dimensional models.",
    "exp.spaceag.achievement-4": "I validated data and reports through functional, regression, and automated control tests.",
    "exp.hospital-bi.role": "BI Solution Developer",
    "exp.hospital-bi.company": "Hospital Nacional Ramiro Prialé — Red Asistencial Junín",
    "exp.hospital-bi.period": "Sep. 2025 — Jul. 2026",
    "exp.hospital-bi.location": "Huancayo, Perú",
    "exp.hospital-bi.type": "Social outreach",
    "exp.hospital-bi.description":
      "Development of a Business Intelligence solution to centralize information on resource consumption in imaging diagnosis. I integrated data processing, reports, and quality and performance testing.",
    "exp.hospital-bi.achievement-0": "I implemented the solution with Angular, Django, and MariaDB.",
    "exp.hospital-bi.achievement-1": "I developed ETL processes and automated validations to control data integrity.",
    "exp.hospital-bi.achievement-2": "I ran end-to-end tests on the system's critical flows.",
    "exp.hospital-bi.achievement-3": "I performed stress and performance testing with JMeter to evaluate response under concurrency.",
    "exp.c34.role": "Junior Full Stack Developer and IT Support",
    "exp.c34.company": "C34",
    "exp.c34.period": "Jan. 2025 — Dec. 2025",
    "exp.c34.location": "Huancayo, Perú",
    "exp.c34.type": "Enterprise software",
    "exp.c34.description":
      "Development of modules for an accounting system and IT infrastructure support. I worked on business logic, data persistence, testing, and technical documentation for electronic invoicing products.",
    "exp.c34.achievement-0": "I developed accounting modules with Laravel, Vue.js, and SQL Server.",
    "exp.c34.achievement-1": "I implemented unit and integration tests to validate functionalities.",
    "exp.c34.achievement-2": "I prepared technical documentation with Astro and Starlight.",
    "exp.c34.achievement-3": "I integrated cloud services and provided network and POS device support.",
    "exp.c34.achievement-4": "I applied security practices based on OWASP Top 10 and ISO 27001.",
    "exp.dev-stream.role": "Full Stack Developer Intern",
    "exp.dev-stream.company": "Dev Stream",
    "exp.dev-stream.period": "Jan. 2024 — Apr. 2024",
    "exp.dev-stream.location": "Lima, Perú",
    "exp.dev-stream.type": "Internship",
    "exp.dev-stream.description":
      "Participation in web projects and training in databases, microservices, and DevOps. I collaborated in Scrum teams, validating APIs and reviewing code quality.",
    "exp.dev-stream.achievement-0": "I participated in projects with Spring Boot, PostgreSQL, and Angular.",
    "exp.dev-stream.achievement-1": "I validated REST APIs and microservices via Postman.",
    "exp.dev-stream.achievement-2": "I analyzed maintainability and vulnerabilities with SonarQube.",
    "exp.dev-stream.achievement-3": "I used AWS EC2 and S3 for deployment and storage.",
    "exp.rec.transformagob.name": "Hackathon Transformagob — PCM",
    "exp.rec.transformagob.position": "2nd place",
    "exp.rec.transformagob.focus": "Innovation and digital transformation",
    "exp.rec.concempi.name": "CONCEMPI V — PMI Lima",
    "exp.rec.concempi.position": "Winner",
    "exp.rec.concempi.focus": "National project competition",
    "exp.rec.credicorp.name": "Credicorp Voices Awards",
    "exp.rec.credicorp.position": "Top 50",
    "exp.rec.credicorp.focus": "Finalist",
    "exp.rec.harvard-upch.name": "Hackathon Harvard with UPCH support",
    "exp.rec.harvard-upch.position": "Winner",
    "exp.rec.harvard-upch.focus": "Innovation",
    "exp.rec.nasa-space-apps.name": "NASA Space Apps Challenge — Universidad Continental",
    "exp.rec.nasa-space-apps.position": "3rd place",
    "exp.rec.nasa-space-apps.focus": "Space technology and data",
    "exp.rec.impact-startup.name": "Impact Start Up Competition",
    "exp.rec.impact-startup.position": "3rd place",
    "exp.rec.impact-startup.focus": "Scale Incubator / UNT",
  },
};

interface LanguageContextType {
  lang: Locale;
  setLang: (next: Locale) => void;
  t: (key: string, params?: Record<string, string>, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-lang") as Locale | null;
    if (stored && LOCALES.includes(stored)) {
      setLangState(stored);
    }
  }, []);

  const setLang = useCallback((next: Locale) => {
    setLangState(next);
    localStorage.setItem("portfolio-lang", next);
    document.documentElement.lang = next;
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (key: string, params?: Record<string, string>, fallback?: string) => {
      let text = translations[lang][key] ?? fallback ?? key;
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          text = text.replace(new RegExp(`\\{${k}\\}`, "g"), v);
        });
      }
      return text;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}

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
    name: "EcoGuardián",
    description:
      "Plataforma orientada a la detección de la rancha de la papa mediante datos de la NASA. Integra un videojuego educativo en 3D para enseñar a los agricultores sobre la enfermedad y su prevención.",
    year: "2025",
    image: "/assets/proyectos/ecoguardian.jpg",
    technologies: ["Python", "JavaScript", "Three.js"],
    github: "https://github.com/Favio-coder/chatbot",
    demo: "https://hack-iota-seven.vercel.app/"
  },
  {
    id: "project-02",
    name: "Komuna",
    description:
      "Plataforma que conecta a estudiantes, docentes e investigadores para crear proyectos de responsabilidad social universitaria. Incorpora financiamiento colectivo para apoyar iniciativas de proyección social.",
    year: "2026",
    image: "/assets/proyectos/komuna.jpg",
    technologies: ["JavaScript", "React", "Python", "FastAPI", "Vercel"],
    github: "https://github.com/Favio-coder/Desafio3-UNCP-Komuna",
    demo: "https://desafio3-uncp-komuna.vercel.app/"
  },
  {
    id: "project-03",
    name: "Dashboard Hospitalario",
    description:
      "Aplicación web progresiva para el área de diagnóstico por imágenes del Hospital Nacional Ramiro Prialé Prialé. Transforma registros operativos en reportes e indicadores para apoyar la planificación y el uso de recursos. Acceso restringido.",
    year: "2026",
    image: "/assets/proyectos/hospital.jpg",
    technologies: [
      "TypeScript",
      "Angular",
      "Python",
      "Django",
      "MariaDB",
      "SQL",
      "Docker"
    ],
    github: "https://github.com/proysocial/frontend-hospital",
    demo: "https://frontend-hospital-liard.vercel.app/login"
  },
  {
    id: "project-04",
    name: "Guardianes del Movimiento",
    description:
      "Videojuego educativo que utiliza visión por computadora para reconocer posturas corporales en tiempo real. Convierte los movimientos del jugador en acciones dentro del juego y promueve el aprendizaje mediante la interacción física.",
    year: "2026",
    image: "/assets/proyectos/guardianes.jpg",
    technologies: ["JavaScript", "MediaPipe", "OpenCV", "Vercel"],
    github: "https://github.com/Favio-coder/Juego-Video",
    demo: "https://juego-video.vercel.app/"
  },
  {
    id: "project-05",
    name: "KoEduko",
    description:
      "Plataforma educativa que facilita el aprendizaje entre pares mediante el emparejamiento de estudiantes según sus atributos. Integra sesiones, materiales y seguimiento del desempeño para apoyar la colaboración y la evaluación del aprendizaje.",
    year: "2026",
    image: "/assets/proyectos/koeduko.jpg",
    technologies: [
      "TypeScript",
      "Vue",
      "Supabase",
      "PostgreSQL",
      "Cypress",
      "Vercel"
    ],
    github: "https://github.com/Favio-coder/KoEduko",
    demo: "https://ko-eduko.vercel.app/"
  },
  {
    id: "project-06",
    name: "KoEduko - HackAndes",
    description:
      "Plataforma educativa que facilita el aprendizaje entre pares mediante el emparejamiento de estudiantes según sus atributos. Integra sesiones, materiales y seguimiento del desempeño para apoyar la colaboración y la evaluación del aprendizaje creado para la Hackathon Hack The Andes organizado por el Peru Tech Week.",
    year: "2026",
    image: "/assets/proyectos/koeduko2.png",
    technologies: [
      "Javascript",
      "React",
      "Firebase",
      "Elevenlabs",
      "Gemini",
      "Vercel"
    ],
    github: "https://github.com/Favio-coder/Koeduko-hackandes.gito",
    demo: "https://koeduko-hackandes.vercel.app"
  },

];
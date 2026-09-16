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
    name: "Chatbot Salud Mental",
    description: "Chatbot diseñado para apoyar la salud mental de estudiantes y cuidadores no profesionales de Alzheimer. Construido con Rasa y un dataset personalizado para brindar respuestas adaptadas.",
    year: "2026",
    image: "/assets/images/projects/chatbot.png",
    technologies: ["Python", "Rasa", "NLP"],
    github: "https://github.com/Favio-coder/chatbot",
  },
  {
    id: "project-02",
    name: "Alzhivida App",
    description: "App de Alzhivida, mi startup de salud mental, ofrece apoyo y recursos para cuidadores de personas con Alzheimer. Incluye herramientas de salud mental y seguimiento.",
    year: "2026",
    image: "/assets/images/projects/appalzhivida.png",
    technologies: ["PHP", "Laravel", "MySQL"],
    github: "https://github.com/Favio-coder/appalzhivida",
  },
  {
    id: "project-03",
    name: "Fronted-TE",
    description: "Aplicación móvil desarrollada con React Native que utiliza una API de IA para detectar la severidad del Alzheimer mediante escáneres de tomografía. Para profesionales de la salud.",
    year: "2026",
    image: "/assets/images/projects/fronted-te.png",
    technologies: ["React Native", "JavaScript", "IA"],
    github: "https://github.com/Favio-coder/fronted-te",
  },
  {
    id: "project-04",
    name: "MediaPipe Pose",
    description: "Juego educativo que detecta posturas corporales usando MediaPipe. Utiliza visión por computadora y el framework MediaPipe para analizar y reconocer posturas en tiempo real.",
    year: "2026",
    image: "/assets/images/projects/mediapipe.png",
    technologies: ["Python", "MediaPipe", "OpenCV"],
    github: "https://github.com/Favio-coder/MediaPipe",
  },
  {
    id: "project-05",
    name: "Agroradar 2",
    description: "Sistema de radar para detectar tardeza de la papa. Solución desplegada como aplicación móvil con React Native. Algoritmo de detección construido en Python.",
    year: "2026",
    image: "/assets/images/projects/agroradar2.png",
    technologies: ["TypeScript", "React Native", "Python"],
    github: "https://github.com/Favio-coder/agroradar2",
  },
  {
    id: "project-06",
    name: "Api-Python Alzheimer",
    description: "Red neuronal diseñada para detectar la severidad del Alzheimer mediante escáneres de tomografía. La API procesa imágenes y analiza las etapas de la enfermedad.",
    year: "2026",
    image: "/assets/images/projects/api-python.png",
    technologies: ["Python", "TensorFlow", "Deep Learning"],
    github: "https://github.com/Favio-coder/Api-python",
  },
];

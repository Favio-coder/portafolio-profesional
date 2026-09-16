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
    description: "[ADD_DESCRIPTION]",
    year: "2026",
    image: "/assets/images/projects/eduko.png",
    technologies: ["Next.js", "React", "TypeScript"],
    github: "[ADD_GITHUB]",
    demo: "[ADD_LINK]",
  },
  {
    id: "project-02",
    name: "PROJECT_02",
    description: "[ADD_DESCRIPTION]",
    year: "2026",
    image: "/assets/images/projects/project-02.png",
    technologies: ["[ADD_TECH]"],
    github: "[ADD_GITHUB]",
    demo: "[ADD_LINK]",
  },
  {
    id: "project-03",
    name: "PROJECT_03",
    description: "[ADD_DESCRIPTION]",
    year: "2026",
    image: "/assets/images/projects/project-03.png",
    technologies: ["[ADD_TECH]"],
    github: "[ADD_GITHUB]",
    demo: "[ADD_LINK]",
  },
];

import { cuaderno } from "@/data/cuaderno";
import { projects } from "@/data/project";
import { gallery } from "@/data/gallery";

export const destinations = [
  { id: "home", label: "Inicio", href: "/#home", aliases: ["inicio"] },
  { id: "about", label: "Sobre mí", href: "/#about", aliases: ["sobre-mi", "sobre mi"] },
  { id: "tracks", label: "Tracks técnicos", href: "/#tracks", aliases: ["stack", "tecnologias"] },
  { id: "experience", label: "Experiencia", href: "/#experience", aliases: ["experiencia"] },
  { id: "projects", label: "Proyectos", href: "/#projects", aliases: ["proyectos"] },
  { id: "cuaderno", label: "Cuaderno semanal", href: "/cuaderno", aliases: ["notebook"] },
  { id: "gallery", label: "Galería", href: "/#gallery", aliases: ["galeria"] },
  { id: "contact", label: "Contacto", href: "/#contact", aliases: ["contacto", "./connect.sh"] },
];
export interface TerminalResult { text: string; href?: string; portrait?: boolean; clear?: boolean; close?: boolean }
const normalize = (value: string) => value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ");
const resolve = (value: string) => destinations.find((d) => d.id === value || d.aliases.includes(value));
const branch = (index: number, length: number) => index === length - 1 ? "└── " : "├── ";
export const terminalHelp = `NAVEGA MÁS RÁPIDO POR FAVIO_OS

ir <sección>       Abre una sección del portafolio
ls                 Muestra todas las secciones
cuaderno           Explora semanas y actividades en árbol
ir cuaderno 3      Abre directamente la semana 3
projects           Lista proyectos y tecnologías reales
gallery            Explora el índice de fotografías
whoami             Revela mi retrato en caracteres
help               Vuelve a mostrar esta guía
clear / exit       Limpia la pantalla / cierra el terminal

También puedes usar cd o open en lugar de ir.
↑ ↓ historial · Tab autocompleta · Esc cierra
Pista: los archivos ocultos aparecen con ls -a.`;
export const completions = ["help", "ls", "ls -a", "tree", "whoami", "clear", "exit", "pwd", "history", "neofetch", ...destinations.map((d) => d.id), ...["ir", "cd", "open", "tree", "ls"].flatMap((verb) => destinations.map((d) => `${verb} ${d.id}`)), ...cuaderno.map((w) => `ir cuaderno ${w.number}`)];

export function runTerminalCommand(input: string, pathname: string): TerminalResult {
  const command = normalize(input);
  if (command === "help" || command === "ayuda") return { text: terminalHelp };
  if (command === "clear" || command === "cls") return { text: "", clear: true };
  if (command === "exit" || command === "salir") return { text: "Sesión en pausa. Hasta pronto.", close: true };
  if (command === "whoami" || command === "neofetch") return { text: "FAVIO ASTURIMAC\nFull Stack Developer · Perú\nRENDER: ASCII / FavioAsturimac.png", portrait: true };
  if (command === "pwd") return { text: `~/portfolio${pathname === "/" ? "" : pathname}` };
  if (command === "ls -a") return { text: "~/portfolio/\n.secret/\n  café     → combustible del sistema\n  sudo     → acceso de visitante\n  ping     → señal de vida\n\nPrueba: cat .secret" };
  if (command === "cat .secret") return { text: "[EASTER EGG DESBLOQUEADO]\nLa interfaz es el mapa. La curiosidad es el comando.\nHas encontrado un pequeño rincón de FAVIO_OS. :)" };
  if (["cafe", "coffee"].includes(command)) return { text: "    ( (\n     ) )\n  .------.\n  | JAVA |]   +1 curiosidad\n  `------´\nCafé virtual servido. Listo para seguir explorando." };
  if (command === "sudo" || command.startsWith("sudo ")) return { text: "Permiso denegado: ya tienes el privilegio más importante, explorar. :)" };
  if (command === "ping") return { text: "PONG! FAVIO_OS está aquí.\nSeñal local recibida. Curiosidad: ONLINE." };
  if (["ls", "tree", "ls /", "tree /"].includes(command)) return { text: "portfolio/\n" + destinations.map((d, i) => `${branch(i, destinations.length)}${d.id}/ — ${d.label}`).join("\n") + "\n\nAbre una sección: ir projects" };
  const navigation = command.match(/^(?:ir(?: a(?: seccion)?)?|cd|open|goto)\s+(.+)$/);
  const rawTarget = (navigation?.[1] ?? command.replace(/^(?:tree|ls)\s+/, "")).replace(/^\.\//, "").replace(/^\//, "").replace(/\/$/, "");
  const weekMatch = rawTarget.match(/^cuaderno(?:\/|\s+)(?:semana[- ]?)?(\d+)$/);
  if (weekMatch) {
    const week = cuaderno.find((w) => w.number === Number(weekMatch[1]));
    if (!week) return { text: "Semana no encontrada. Usa cuaderno para ver las disponibles." };
    return navigation ? { text: `Abriendo semana ${week.number}: ${week.title}`, href: `/cuaderno#${week.id}` } : { text: `${week.title}\n${week.summary}\n\nAbrir: ir cuaderno ${week.number}` };
  }
  const target = resolve(rawTarget);
  if (navigation) return target ? { text: `Abriendo ${target.label}…`, href: target.href } : { text: `Sección desconocida: ${rawTarget}\nUsa ls para consultar los destinos.` };
  if (target?.id === "cuaderno") return { text: "cuaderno/\n" + cuaderno.map((w, i) => {
    const stem = i === cuaderno.length - 1 ? "    " : "│   ";
    return `${branch(i, cuaderno.length)}semana-${String(w.number).padStart(2, "0")}/ [${w.status}]\n${stem}├── ${w.title}\n${stem}├── ${w.activities.length} actividades · ${w.topics?.length ?? 0} temas\n${stem}└── abrir → ir cuaderno ${w.number}`;
  }).join("\n") };
  if (target?.id === "projects") return { text: "projects/\n" + projects.map((p, i) => `${branch(i, projects.length)}${p.name}/ (${p.year})\n${i === projects.length - 1 ? "    " : "│   "}└── ${p.technologies.join(" · ")}`).join("\n") + "\n\nVer previews y enlaces: ir projects" };
  if (target?.id === "gallery") return { text: "gallery/\n" + gallery.map((g, i) => `${branch(i, gallery.length)}${g.id} — ${g.title} [${g.category ?? "IMAGE"}]`).join("\n") + "\n\nAbrir fotografías: ir gallery" };
  if (target) return { text: `Abriendo ${target.label}…`, href: target.href };
  return { text: `Comando no encontrado: ${input.trim()}\nEscribe help para ver la guía o ls para explorar.` };
}

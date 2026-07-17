import { Github, Linkedin, Mail } from "lucide-react"
import type { HeroSocial, HeroData } from "../types/hero.types"

export const ROLES = [
  "Senior Software Engineer",
  "Full Stack Developer",
  "Problem Solver",
]

export const heroSocials: HeroSocial[] = [
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Email", href: "#contact", icon: Mail },
]

export const heroDataMap: Record<string, HeroData> = {
  en: {
    badge: "Available for new projects",
    greeting: "Hi, my name is",
    roles: {
      senior: "Senior Software Engineer",
      fullStack: "Full Stack Developer",
      problemSolver: "Problem Solver",
    },
    description:
      "I design and build resilient, accessible web products where thoughtful interface design meets solid engineering. I care about performance, the small details, and shipping work that lasts.",
    cta: { viewWork: "View my work", downloadCv: "Download CV" },
    stats: { yearsLabel: "Years building", projectsLabel: "Projects shipped" },
    portraitAlt: "Portrait of Elena Vargas",
  },
  es: {
    badge: "Disponible para nuevos proyectos",
    greeting: "Hola, me llamo",
    roles: {
      senior: "Ingeniería de Software Senior",
      fullStack: "Desarrolladora Full Stack",
      problemSolver: "Resolutora de Problemas",
    },
    description:
      "Diseño y construyo productos web resilientes y accesibles donde el diseño de interfaz cuidado se une a la ingeniería sólida. Me importan el rendimiento, los pequeños detalles y entregar trabajo que perdure.",
    cta: { viewWork: "Ver mi trabajo", downloadCv: "Descargar CV" },
    stats: { yearsLabel: "Años construyendo", projectsLabel: "Proyectos entregados" },
    portraitAlt: "Retrato de Elena Vargas",
  },
}

import { Layout, Server, Database, Wrench } from "lucide-react"
import type { SkillCategory } from "../types/skills.types"

export const skillCategories: SkillCategory[] = [
  {
    icon: Layout,
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Accessibility"],
  },
  {
    icon: Server,
    title: "Backend",
    skills: ["Node.js", "Go", "GraphQL", "REST APIs", "tRPC", "Edge Functions"],
  },
  {
    icon: Database,
    title: "Data & Infra",
    skills: ["PostgreSQL", "Redis", "Prisma", "Docker", "AWS", "Vercel"],
  },
  {
    icon: Wrench,
    title: "Tooling & Practices",
    skills: ["Git", "CI/CD", "Vitest", "Playwright", "Design Systems", "Observability"],
  },
]

export const marqueeSkills: string[] = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "GraphQL",
  "Tailwind CSS",
  "Go",
  "AWS",
  "Docker",
  "Redis",
  "Vercel",
]

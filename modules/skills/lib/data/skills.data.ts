import {
  Layout,
  Server,
  Database,
  Wrench,
  Accessibility,
  Webhook,
  Zap,
  Component,
  Activity,
  Drama,
} from "lucide-react"
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiGo,
  SiGraphql,
  SiTrpc,
  SiPostgresql,
  SiRedis,
  SiPrisma,
  SiDocker,
  SiVercel,
  SiGit,
  SiGithubactions,
  SiVitest,
} from "react-icons/si"
import { SkillCategory } from "../types/skills.types";


export const skillCategories: SkillCategory[] = [
  {
    icon: Layout,
    title: "Frontend",
    tagline: "Interfaces that feel fast and effortless.",
    skills: [
      { name: "React", Icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", Icon: SiNextdotjs, color: "#111111" },
      { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
      { name: "Framer Motion", Icon: SiFramer, color: "#0099FF" },
      { name: "Accessibility", Icon: Accessibility, color: "#34D399" },
    ],
  },
  {
    icon: Server,
    title: "Backend",
    tagline: "APIs and services built to scale.",
    skills: [
      { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Go", Icon: SiGo, color: "#00ADD8" },
      { name: "GraphQL", Icon: SiGraphql, color: "#E10098" },
      { name: "REST APIs", Icon: Webhook, color: "#F59E0B" },
      { name: "tRPC", Icon: SiTrpc, color: "#398CCB" },
      { name: "Edge Functions", Icon: Zap, color: "#FACC15" },
    ],
  },
  {
    icon: Database,
    title: "Data & Infra",
    tagline: "Reliable storage and deployment.",
    skills: [
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
      { name: "Redis", Icon: SiRedis, color: "#FF4438" },
      { name: "Prisma", Icon: SiPrisma, color: "#4FD1C5" },
      { name: "Docker", Icon: SiDocker, color: "#2496ED" },
      { name: "AWS", Icon: SiPrisma, color: "#FF9900" },
      { name: "Vercel", Icon: SiVercel, color: "#111111" },
    ],
  },
  {
    icon: Wrench,
    title: "Tooling & Practices",
    tagline: "The craft behind shipping with confidence.",
    skills: [
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "CI/CD", Icon: SiGithubactions, color: "#2088FF" },
      { name: "Vitest", Icon: SiVitest, color: "#FCC72B" },
      { name: "Playwright", Icon: Drama, color: "#2EAD33" },
      { name: "Design Systems", Icon: Component, color: "#F472B6" },
      { name: "Observability", Icon: Activity, color: "#34D399" },
    ],
  },
]

export const marqueeSkills: { name: string; Icon: SkillCategory["skills"][number]["Icon"]; color: string }[] = [
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#111111" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "GraphQL", Icon: SiGraphql, color: "#E10098" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
  { name: "Go", Icon: SiGo, color: "#00ADD8" },
  { name: "AWS", Icon: SiGo, color: "#FF9900" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Redis", Icon: SiRedis, color: "#FF4438" },
  { name: "Vercel", Icon: SiVercel, color: "#111111" },
]

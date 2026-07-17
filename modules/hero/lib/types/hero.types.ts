import type { LucideIcon } from "lucide-react"

export interface HeroSocial {
  label: string
  href: string
  icon: LucideIcon
}

export interface HeroData {
  badge: string
  greeting: string
  roles: {
    senior: string
    fullStack: string
    problemSolver: string
  }
  description: string
  cta: {
    viewWork: string
    downloadCv: string
  }
  stats: {
    yearsLabel: string
    projectsLabel: string
  }
  portraitAlt: string
}

export type HeroDataResult =
  | { ok: true; data: HeroData }
  | { ok: false; error: string }

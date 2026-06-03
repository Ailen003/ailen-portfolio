import type { ComponentType, SVGProps } from "react"

export type IconType = ComponentType<SVGProps<SVGSVGElement>>

/** Proficiency level for a given technology */
export type SkillLevel = "basic" | "intermediate" | "expert"

export interface SkillLevelMeta {
  /** Human-readable label shown next to the stars */
  label: string
  /** Number of filled stars (out of 3) */
  stars: number
}

/** Maps each level to its display label + star count */
export const SKILL_LEVEL_META: Record<SkillLevel, SkillLevelMeta> = {
  basic: { label: "Básico", stars: 1 },
  intermediate: { label: "Intermedio", stars: 2 },
  expert: { label: "Experto", stars: 3 },
}

/** Total number of stars rendered for any skill */
export const SKILL_MAX_STARS = 3

export interface Skill {
  name: string
  /** Brand/logo icon for the technology */
  Icon: IconType
  /** Brand color used for the hover glow + colored reveal (hex) */
  color: string
  /** Proficiency level used to render the star rating */
  level: SkillLevel
  /** Detailed experience description, written in Markdown */
  description: string
}

export interface SkillCategory {
  /** Lucide icon representing the category */
  icon: IconType
  /** Accent color for the category icon and card glow (hex) */
  color: string
  title: string
  /** Short tagline shown under the category title */
  tagline: string
  skills: Skill[]
}

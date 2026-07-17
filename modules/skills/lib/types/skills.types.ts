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
  basic: { label: "Basic", stars: 1 },
  intermediate: { label: "Intermediate", stars: 2 },
  expert: { label: "Expert", stars: 3 },
}

/** Total number of stars rendered for any skill */
export const SKILL_MAX_STARS = 3

/** Fine-grained technology category tags (a skill can have multiple) */
export type SkillCategoryTag =
  | "language"
  | "framework"
  | "library"
  | "tool"
  | "database"
  | "cloud"
  | "testing"
  | "design"
  | "practice"

export interface SkillCategoryTagMeta {
  /** Human-readable label for the tag */
  label: string
  /** Accent color for the tag badge */
  color: string
}

export const SKILL_CATEGORY_TAG_META: Record<SkillCategoryTag, SkillCategoryTagMeta> = {
  language:  { label: "Language",      color: "#F59E0B" },
  framework: { label: "Framework",     color: "#3B82F6" },
  library:   { label: "Library",       color: "#8B5CF6" },
  tool:      { label: "Tool",          color: "#10B981" },
  database:  { label: "Database",      color: "#EF4444" },
  cloud:     { label: "Cloud / Infra", color: "#06B6D4" },
  testing:   { label: "Testing",       color: "#F472B6" },
  design:    { label: "Design",        color: "#F97316" },
  practice:  { label: "Practice",      color: "#6366F1" },
}

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
  /** Fine-grained category tags for filtering in the galaxy view */
  categories: SkillCategoryTag[]
  /** Origin group title, injected by getAllSkills() — not set in raw data */
  group?: string
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

export interface SkillsData {
  title: string
  subtitle: string
  tabs: {
    grid: string
    gridMobile: string
    galaxy: string
  }
}

export type SkillsDataResult =
  | { ok: true; data: SkillsData }
  | { ok: false; error: string }

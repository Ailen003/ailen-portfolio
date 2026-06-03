import type { ComponentType, SVGProps } from "react"

export type IconType = ComponentType<SVGProps<SVGSVGElement>>

export interface Skill {
  name: string
  /** Brand/logo icon for the technology */
  Icon: IconType
  /** Brand color used for the hover glow + colored reveal (hex) */
  color: string
}

export interface SkillCategory {
  /** Lucide icon representing the category */
  icon: IconType
  title: string
  /** Short tagline shown under the category title */
  tagline: string
  skills: Skill[]
}

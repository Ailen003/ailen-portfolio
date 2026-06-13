import type { ComponentType, SVGProps } from "react"

export type IconType = ComponentType<SVGProps<SVGSVGElement>>

export interface Service {
  key: string
  icon: IconType
  color: string
  title: string
  tagline: string
  bullets: string[]
  idealFor: string
}

export interface ProcessStep {
  number: string
  label: string
  description: string
}

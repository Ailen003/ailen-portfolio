import type { LucideIcon } from "lucide-react"

export interface AboutValue {
  icon: LucideIcon
  title: string
  description: string
}

export interface AboutFact {
  label: string
  value: string
}

export interface AboutValueText {
  title: string
  description: string
}

export interface AboutData {
  title: string
  p1: string
  p2: string
  p3: string
  values: {
    productMinded: AboutValueText
    craftQuality: AboutValueText
    collaborative: AboutValueText
    alwaysLearning: AboutValueText
  }
  facts: {
    basedIn: AboutFact
    experience: AboutFact
    focus: AboutFact
    languages: AboutFact
  }
}

export type AboutDataResult =
  | { ok: true; data: AboutData }
  | { ok: false; error: string }

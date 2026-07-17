export interface ExperienceRole {
  period: string
  role: string
  company: string
  logo?: string
  summary: string
  achievements: string[]
  tags: string[]
}

export interface ExperienceData {
  title: string
  subtitle: string
  roles: ExperienceRole[]
}

export type ExperienceDataResult =
  | { ok: true; data: ExperienceData }
  | { ok: false; error: string }

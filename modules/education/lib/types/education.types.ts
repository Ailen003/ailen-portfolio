export interface EducationEntry {
  period: string
  title: string
  org: string
  detail: string
}

export interface Certification {
  title: string
  org: string
  year: string
}

export interface EducationData {
  title: string
  subtitle: string
  sectionEducation: string
  sectionCertifications: string
  entries: EducationEntry[]
  certifications: Certification[]
}

export type EducationDataResult =
  | { ok: true; data: EducationData }
  | { ok: false; error: string }

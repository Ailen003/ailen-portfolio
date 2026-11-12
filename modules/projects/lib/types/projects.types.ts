import type { ContributionProject, EndToEndProject, ResearchProject } from "./project.types"

export interface ProjectsData {
  title: string
  subtitle: string
  endToEnd: EndToEndProject[]
  contributions: ContributionProject[]
  research: ResearchProject[]
}

export type ProjectsDataResult =
  | { ok: true; data: ProjectsData }
  | { ok: false; error: string }

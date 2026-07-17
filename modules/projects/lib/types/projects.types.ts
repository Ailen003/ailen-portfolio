export interface ProjectsData {
  title: string
  subtitle: string
}

export type ProjectsDataResult =
  | { ok: true; data: ProjectsData }
  | { ok: false; error: string }

import { projectsDataMap } from "../data/projects.data"
import type { ProjectsData } from "../types/projects.types"

export function getProjectsData(locale: string): ProjectsData {
  return projectsDataMap[locale] ?? projectsDataMap["en"]
}

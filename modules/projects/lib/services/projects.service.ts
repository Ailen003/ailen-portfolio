import { projectsDataMap } from "../data/projects.data"
import type { ProjectsData } from "../types/projects.types"

export function getProjectsData(locale: string): ProjectsData {
  return Object.hasOwn(projectsDataMap, locale) ? projectsDataMap[locale] : projectsDataMap.en
}

export function getEndToEndProjectBySlug(locale: string, slug: string) {
  return getProjectsData(locale).endToEnd.find((project) => project.slug === slug)
}

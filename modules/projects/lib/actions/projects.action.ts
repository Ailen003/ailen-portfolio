"use server"

import { getLocale } from "next-intl/server"
import { getProjectsData } from "../services/projects.service"
import type { ProjectsDataResult } from "../types/projects.types"

export async function fetchProjectsData(): Promise<ProjectsDataResult> {
  try {
    const locale = await getLocale()
    const data = getProjectsData(locale)
    return { ok: true, data }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error fetching projects data"
    return { ok: false, error: message }
  }
}

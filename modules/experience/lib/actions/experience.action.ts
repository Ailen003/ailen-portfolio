"use server"

import { getLocale } from "next-intl/server"
import { getExperienceData } from "../services/experience.service"
import type { ExperienceDataResult } from "../types/experience.types"

export async function fetchExperienceData(): Promise<ExperienceDataResult> {
  try {
    const locale = await getLocale()
    const data = getExperienceData(locale)
    return { ok: true, data }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error fetching experience data"
    return { ok: false, error: message }
  }
}

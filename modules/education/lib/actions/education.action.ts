"use server"

import { getLocale } from "next-intl/server"
import { getEducationData } from "../services/education.service"
import type { EducationDataResult } from "../types/education.types"

export async function fetchEducationData(): Promise<EducationDataResult> {
  try {
    const locale = await getLocale()
    const data = getEducationData(locale)
    return { ok: true, data }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error fetching education data"
    return { ok: false, error: message }
  }
}

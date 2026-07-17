"use server"

import { getLocale } from "next-intl/server"
import { getSkillsData } from "../services/skills.service"
import type { SkillsDataResult } from "../types/skills.types"

export async function fetchSkillsData(): Promise<SkillsDataResult> {
  try {
    const locale = await getLocale()
    const data = getSkillsData(locale)
    return { ok: true, data }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error fetching skills data"
    return { ok: false, error: message }
  }
}

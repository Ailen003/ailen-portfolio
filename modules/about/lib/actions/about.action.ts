"use server"

import { getLocale } from "next-intl/server"
import { getAboutData } from "../services/about.service"
import type { AboutDataResult } from "../types/about.types"

export async function fetchAboutData(): Promise<AboutDataResult> {
  try {
    const locale = await getLocale()
    const data = getAboutData(locale)
    return { ok: true, data }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error fetching about data"
    return { ok: false, error: message }
  }
}

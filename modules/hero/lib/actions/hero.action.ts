"use server"

import { getLocale } from "next-intl/server"
import { getHeroData } from "../services/hero.service"
import type { HeroDataResult } from "../types/hero.types"

export async function fetchHeroData(): Promise<HeroDataResult> {
  try {
    const locale = await getLocale()
    const data = getHeroData(locale)
    return { ok: true, data }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error fetching hero data"
    return { ok: false, error: message }
  }
}

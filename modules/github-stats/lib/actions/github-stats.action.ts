"use server"

import { getLocale } from "next-intl/server"
import { getGithubStats } from "../services/github-stats.service"
import type { GithubStatsResult } from "../types/github-stats.types"

export async function fetchGithubStats(): Promise<GithubStatsResult> {
  try {
    const locale = await getLocale()
    const data = await getGithubStats(locale)
    return { ok: true, data }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error fetching GitHub stats"
    return { ok: false, error: message }
  }
}

"use server"

import { getGithubStats } from "../services/github-stats.service"
import type { GithubStatsResult } from "../types/github-stats.types"

export async function fetchGithubStats(): Promise<GithubStatsResult> {
  try {
    const data = await getGithubStats()
    return { ok: true, data }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error fetching GitHub stats"
    return { ok: false, error: message }
  }
}

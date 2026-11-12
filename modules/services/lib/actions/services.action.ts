"use server"

import { getLocale } from "next-intl/server"
import { getServicesData } from "../services/services.service"
import type { ServicesDataResult } from "../types/services.types"

export async function fetchServicesData(): Promise<ServicesDataResult> {
  try {
    const locale = await getLocale()
    return { ok: true, data: getServicesData(locale) }
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown error fetching services data"
    return { ok: false, error }
  }
}

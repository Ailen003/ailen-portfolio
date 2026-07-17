"use server"

import { getLocale } from "next-intl/server"
import { getContactData } from "../services/contact.service"
import type { ContactDataResult } from "../types/contact.types"

export async function fetchContactData(): Promise<ContactDataResult> {
  try {
    const locale = await getLocale()
    const data = getContactData(locale)
    return { ok: true, data }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error fetching contact data"
    return { ok: false, error: message }
  }
}

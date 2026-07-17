import { aboutDataMap } from "../data/about.data"
import type { AboutData } from "../types/about.types"

export function getAboutData(locale: string): AboutData {
  return aboutDataMap[locale] ?? aboutDataMap["en"]
}

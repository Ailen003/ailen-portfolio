import { experienceDataMap } from "../data/experience.data"
import type { ExperienceData } from "../types/experience.types"

export function getExperienceData(locale: string): ExperienceData {
  return experienceDataMap[locale] ?? experienceDataMap["en"]
}

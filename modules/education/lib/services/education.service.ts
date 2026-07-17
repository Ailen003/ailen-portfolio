import { educationDataMap } from "../data/education.data"
import type { EducationData } from "../types/education.types"

export function getEducationData(locale: string): EducationData {
  return educationDataMap[locale] ?? educationDataMap["en"]
}

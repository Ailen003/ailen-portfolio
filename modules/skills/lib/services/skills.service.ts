import { skillsDataMap } from "../data/skills.data"
import type { SkillsData } from "../types/skills.types"

export function getSkillsData(locale: string): SkillsData {
  return skillsDataMap[locale] ?? skillsDataMap["en"]
}

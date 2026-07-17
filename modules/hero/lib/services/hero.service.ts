import { heroDataMap } from "../data/hero.data"
import type { HeroData } from "../types/hero.types"

export function getHeroData(locale: string): HeroData {
  return heroDataMap[locale] ?? heroDataMap["en"]
}

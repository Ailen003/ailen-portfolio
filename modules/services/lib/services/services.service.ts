import { servicesDataMap } from "../data/services.data"
import type { ServicesData } from "../types/services.types"

export function getServicesData(locale: string): ServicesData {
  return Object.hasOwn(servicesDataMap, locale) ? servicesDataMap[locale] : servicesDataMap.en
}

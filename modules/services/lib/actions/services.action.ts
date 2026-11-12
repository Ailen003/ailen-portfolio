import { getTranslations } from "next-intl/server"
import { serviceItems, processStepKeys } from "../data/services.data"
import type { ProcessStep } from "../types/services.types"

export async function fetchServicesData() {
  const t = await getTranslations("services")
  return { ok: true as const, data: {
    services: serviceItems.map(item => ({ ...item, title: t(`items.${item.key}.title`), tagline: t(`items.${item.key}.tagline`), bullets: t.raw(`items.${item.key}.bullets`) as string[], idealFor: t(`items.${item.key}.idealFor`) })),
    processSteps: processStepKeys.map((number, index) => ({ number, ...t.raw(`process.${index}`) })) as ProcessStep[],
  } }
}

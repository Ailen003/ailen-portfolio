import en from "@/messages/en.json"
import es from "@/messages/es.json"
import { Building2, Code2, Lightbulb, SearchCode } from "lucide-react"
import type { Service, ProcessStep, ServicesData } from "../types/services.types"

export const BOOKING_URL = "https://calendly.com/your-handle"

export const serviceItems = [
  {
    key: "remoteRole" as const,
    icon: Building2,
    color: "#3B82F6",
  },
  {
    key: "freelance" as const,
    icon: Code2,
    color: "#10B981",
  },
  {
    key: "consulting" as const,
    icon: Lightbulb,
    color: "#F59E0B",
  },
  {
    key: "codeReview" as const,
    icon: SearchCode,
    color: "#8B5CF6",
  },
] satisfies Omit<Service, "title" | "tagline" | "bullets" | "idealFor">[]

export const processStepKeys: ProcessStep["number"][] = ["01", "02", "03", "04"]

function localizeServices(copy: typeof en.services | typeof es.services): ServicesData {
  return {
    services: serviceItems.map(item => ({ ...item, ...copy.items[item.key] })),
    processSteps: copy.process.map((step, index) => ({ number: processStepKeys[index], ...step })),
  }
}

export const servicesDataMap: Record<string, ServicesData> = {
  en: localizeServices(en.services),
  es: localizeServices(es.services),
}

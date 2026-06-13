import { Building2, Code2, Lightbulb, SearchCode } from "lucide-react"
import type { Service, ProcessStep } from "../types/services.types"

export const BOOKING_URL = "https://calendly.com/your-handle"

export const serviceItems: Omit<Service, "title" | "tagline" | "bullets" | "idealFor">[] = [
  {
    key: "remoteRole",
    icon: Building2,
    color: "#3B82F6",
  },
  {
    key: "freelance",
    icon: Code2,
    color: "#10B981",
  },
  {
    key: "consulting",
    icon: Lightbulb,
    color: "#F59E0B",
  },
  {
    key: "codeReview",
    icon: SearchCode,
    color: "#8B5CF6",
  },
]

export const processStepKeys: ProcessStep["number"][] = ["01", "02", "03", "04"]

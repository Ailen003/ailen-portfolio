import { Compass, Code2, Users, Sparkles } from "lucide-react"
import type { AboutValue, AboutFact } from "../types/about.types"

export const aboutValues: AboutValue[] = [
  {
    icon: Compass,
    title: "Product-minded",
    description: "I think beyond tickets — about the user, the business, and the long-term health of the codebase.",
  },
  {
    icon: Code2,
    title: "Craft & quality",
    description: "Clean architecture, strong typing, and tests. The details are where good products are made.",
  },
  {
    icon: Users,
    title: "Collaborative",
    description: "I work closely with design and product, mentor engineers, and document decisions clearly.",
  },
  {
    icon: Sparkles,
    title: "Always learning",
    description: "From distributed systems to design systems — I stay curious and share what I learn.",
  },
]

export const aboutFacts: AboutFact[] = [
  { label: "Based in", value: "Barcelona, ES" },
  { label: "Experience", value: "8+ years" },
  { label: "Focus", value: "Full-stack web" },
  { label: "Languages", value: "EN · ES · CA" },
]

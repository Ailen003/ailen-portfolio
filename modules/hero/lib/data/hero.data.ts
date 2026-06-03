import { Github, Linkedin, Mail } from "lucide-react"
import type { HeroSocial } from "../types/hero.types"

export const heroSocials: HeroSocial[] = [
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Email", href: "#contact", icon: Mail },
]

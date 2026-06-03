import { Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react"
import type { ContactChannel, ContactSocial } from "../types/contact.types"

export const contactChannels: ContactChannel[] = [
  { icon: Mail, label: "Email", value: "hello@elena.dev", href: "mailto:hello@elena.dev" },
  { icon: MapPin, label: "Location", value: "Barcelona, Spain", href: undefined },
]

export const contactSocials: ContactSocial[] = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
]

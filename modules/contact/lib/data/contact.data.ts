import { Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react"
import type { ContactChannel, ContactSocial, ContactData } from "../types/contact.types"

export const contactChannels: ContactChannel[] = [
  { icon: Mail, label: "Email", value: "hello@elena.dev", href: "mailto:hello@elena.dev" },
  { icon: MapPin, label: "Location", value: "Barcelona, Spain", href: undefined },
]

export const contactSocials: ContactSocial[] = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
]

export const contactDataMap: Record<string, ContactData> = {
  en: {
    title: "Let\u2019s build something",
    subtitle: "Have a project in mind or just want to say hello? My inbox is always open.",
    description: "Whether you\u2019re looking for an engineer to join your team or need help shipping a product, I\u2019d love to hear about it. I usually reply within a day.",
  },
  es: {
    title: "Construyamos algo juntos",
    subtitle: "\u00bfTienes un proyecto en mente o solo quieres saludar? Mi bandeja de entrada siempre est\u00e1 abierta.",
    description: "Ya sea que est\u00e9s buscando un ingeniero para unirse a tu equipo o necesites ayuda para lanzar un producto, me encantar\u00eda escucharlo. Normalmente respondo en menos de un d\u00eda.",
  },
}

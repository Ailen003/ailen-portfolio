import type { LucideIcon } from "lucide-react"

export interface ContactChannel {
  icon: LucideIcon
  label: string
  value: string
  href: string | undefined
}

export interface ContactSocial {
  icon: LucideIcon
  label: string
  href: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

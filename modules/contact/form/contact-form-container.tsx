"use client"

import { useTranslations } from "next-intl"
import { useState, type FormEvent } from "react"
import { ContactFormPresentational } from "./contact-form-presentational"

export function ContactFormContainer() {
  const t = useTranslations("contact.form")
  const copy = { nameLabel: t("name.label"), namePlaceholder: t("name.placeholder"), emailLabel: t("email.label"), emailPlaceholder: t("email.placeholder"), subjectLabel: t("subject.label"), subjectPlaceholder: t("subject.placeholder"), messageLabel: t("message.label"), messagePlaceholder: t("message.placeholder"), send: t("send"), sending: t("sending"), sent: t("sent") }
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const json = await res.json()

      if (!res.ok) {
        setError(json.error ?? t("error"))
      } else {
        setSent(true)
        form.reset()
        setTimeout(() => setSent(false), 4000)
      }
    } catch {
      setError(t("networkError"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <ContactFormPresentational
      copy={copy}
      sent={sent}
      loading={loading}
      error={error}
      onSubmit={handleSubmit}
    />
  )
}

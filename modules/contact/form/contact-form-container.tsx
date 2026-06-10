"use client"

import { useState, type FormEvent } from "react"
import { ContactFormPresentational } from "./contact-form-presentational"

export function ContactFormContainer() {
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
        setError(json.error ?? "Something went wrong. Please try again.")
      } else {
        setSent(true)
        form.reset()
        setTimeout(() => setSent(false), 4000)
      }
    } catch {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <ContactFormPresentational
      sent={sent}
      loading={loading}
      error={error}
      onSubmit={handleSubmit}
    />
  )
}

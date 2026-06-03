"use client"

import { useState, type FormEvent } from "react"
import { ContactFormPresentational } from "./contact-form-presentational"

export function ContactFormContainer() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    e.currentTarget.reset()
  }

  return <ContactFormPresentational sent={sent} onSubmit={handleSubmit} />
}

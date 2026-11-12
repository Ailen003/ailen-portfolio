"use client"

import type { FormEvent } from "react"
import { Send, Check } from "lucide-react"

interface ContactFormCopy {
  nameLabel: string
  namePlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  subjectLabel: string
  subjectPlaceholder: string
  messageLabel: string
  messagePlaceholder: string
  send: string
  sending: string
  sent: string
}

interface ContactFormPresentationalProps {
  sent: boolean
  loading: boolean
  error: string | null
  copy: ContactFormCopy
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export function ContactFormPresentational({
  sent,
  loading,
  error,
  copy,
  onSubmit,
}: ContactFormPresentationalProps) {
  return (
    <form
      onSubmit={onSubmit}
      data-state={error ? "error" : sent ? "sent" : "idle"}
      className="contact-form paper-card border border-border p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            {copy.nameLabel}
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder={copy.namePlaceholder}
            className="editorial-field px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            {copy.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={copy.emailPlaceholder}
            className="editorial-field px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="subject" className="text-sm font-medium text-foreground">
          {copy.subjectLabel}
        </label>
        <input
          id="subject"
          name="subject"
          required
          placeholder={copy.subjectPlaceholder}
          className="editorial-field px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          {copy.messageLabel}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={copy.messagePlaceholder}
          className="editorial-field resize-none px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <button
        type="submit"
        disabled={loading || sent}
        className="editorial-button mt-6 inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sent ? (
          <>
            <Check className="h-4 w-4" />
            {copy.sent}
          </>
        ) : loading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            {copy.sending}
          </>
        ) : (
          <>
            {copy.send}
            <Send className="h-4 w-4" />
          </>
        )}
      </button>

      {error && (
        <p className="mt-3 text-center text-sm text-destructive">{error}</p>
      )}
    </form>
  )
}

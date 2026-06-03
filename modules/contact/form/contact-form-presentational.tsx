"use client"

import type { FormEvent } from "react"
import { Send, Check } from "lucide-react"

interface ContactFormPresentationalProps {
  sent: boolean
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export function ContactFormPresentational({ sent, onSubmit }: ContactFormPresentationalProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-border bg-card p-6 shadow-lg shadow-primary/5 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            placeholder="Jane Doe"
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="subject" className="text-sm font-medium text-foreground">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          required
          placeholder="Project inquiry"
          className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-foreground">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell me a little about what you're working on..."
          className="resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/25"
      >
        {sent ? (
          <>
            <Check className="h-4 w-4" />
            Message sent
          </>
        ) : (
          <>
            Send message
            <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  )
}

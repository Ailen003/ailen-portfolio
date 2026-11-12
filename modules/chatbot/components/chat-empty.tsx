"use client"

import { Bot } from "lucide-react"
import { useTranslations } from "next-intl"
import { portfolioIdentity } from "@/modules/portfolio/lib/data/identity.data"

interface ChatEmptyProps {
  onSuggest: (question: string) => void
}

export function ChatEmpty({ onSuggest }: ChatEmptyProps) {
  const t = useTranslations("chatbot")
  const suggestedQuestions = [
    t("suggestions.0"),
    t("suggestions.1"),
    t("suggestions.2"),
    t("suggestions.3"),
  ]

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 px-4 py-8 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Bot className="size-7" />
      </div>

      <div className="space-y-1.5">
        <p className="text-sm font-semibold text-foreground">{t("emptyTitle", { name: portfolioIdentity.firstName })}</p>
        <p className="text-xs text-muted-foreground">
          {t("emptyDescription")}
        </p>
      </div>

      <div className="flex w-full flex-col gap-2">
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => onSuggest(q)}
            className="rounded-xl border border-border bg-secondary/50 px-4 py-2.5 text-left text-xs text-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  )
}

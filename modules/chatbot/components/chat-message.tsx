"use client"

import { Bot } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ChatMessage as ChatMessageType } from "../lib/types/chatbot.types"

interface ChatMessageProps {
  message: ChatMessageType
  isStreaming?: boolean
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "flex w-full gap-2.5",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      {!isUser && (
        <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Bot className="size-3.5" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-tr-sm bg-primary text-primary-foreground"
            : "rounded-tl-sm bg-secondary text-foreground",
        )}
      >
        <MessageContent content={message.content} />
        {isStreaming && (
          <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-current align-middle opacity-70" />
        )}
      </div>
    </div>
  )
}

function MessageContent({ content }: { content: string }) {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="mt-2 mb-0.5 text-xs font-semibold uppercase tracking-wide opacity-70">
          {line.slice(4)}
        </h3>,
      )
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="mt-2 mb-1 text-sm font-bold">
          {line.slice(3)}
        </h2>,
      )
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      elements.push(
        <li key={i} className="ml-3 list-disc text-sm">
          {formatInline(line.slice(2))}
        </li>,
      )
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="h-1.5" />)
    } else {
      elements.push(
        <p key={i} className="text-sm">
          {formatInline(line)}
        </p>,
      )
    }
    i++
  }

  return <div className="space-y-0.5">{elements}</div>
}

function formatInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={idx}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={idx} className="rounded bg-black/10 px-1 py-0.5 font-mono text-[11px] dark:bg-white/10">
          {part.slice(1, -1)}
        </code>
      )
    }
    return part
  })
}

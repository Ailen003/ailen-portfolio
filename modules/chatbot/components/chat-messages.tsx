"use client"

import { useEffect, useRef } from "react"
import { ChatMessage } from "./chat-message"
import { ChatEmpty } from "./chat-empty"
import type { ChatMessage as ChatMessageType } from "../lib/types/chatbot.types"

interface ChatMessagesProps {
  messages: ChatMessageType[]
  isStreaming: boolean
  streamingContent: string
  onSuggest: (question: string) => void
}

export function ChatMessages({
  messages,
  isStreaming,
  streamingContent,
  onSuggest,
}: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages.length, streamingContent])

  if (messages.length === 0 && !isStreaming) {
    return <ChatEmpty onSuggest={onSuggest} />
  }

  return (
    <div
      className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4"
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
    >
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}

      {isStreaming && streamingContent && (
        <ChatMessage
          message={{
            id: "streaming",
            role: "assistant",
            content: streamingContent,
            createdAt: Date.now(),
          }}
          isStreaming
        />
      )}

      {isStreaming && !streamingContent && (
        <div className="flex gap-2.5">
          <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <div className="size-3.5 animate-pulse rounded-full bg-primary/50" />
          </div>
          <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-secondary px-4 py-3">
            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
            <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}

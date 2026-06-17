"use client"

import { useState } from "react"
import { Bot, MessageSquarePlus, PanelLeft, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ChatSidebar } from "./chat-sidebar"
import { ChatMessages } from "./chat-messages"
import { ChatInput } from "./chat-input"
import type { ChatSession } from "../lib/types/chatbot.types"

interface ChatPanelProps {
  isOpen: boolean
  onClose: () => void
  sessions: ChatSession[]
  activeChatId: string | null
  activeSession: ChatSession | null
  isStreaming: boolean
  streamingContent: string
  onSend: (text: string) => void
  onStop: () => void
  onNew: () => void
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  onClearAll: () => void
}

export function ChatPanel({
  isOpen,
  onClose,
  sessions,
  activeChatId,
  activeSession,
  isStreaming,
  streamingContent,
  onSend,
  onStop,
  onNew,
  onSelect,
  onDelete,
  onClearAll,
}: ChatPanelProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleNew = () => {
    onNew()
    setSidebarOpen(false)
  }

  const handleSelect = (id: string) => {
    onSelect(id)
    setSidebarOpen(false)
  }

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="AI assistant — Ask about Elena"
        className={cn(
          "fixed bottom-24 right-6 z-50 flex h-[600px] w-[420px] max-h-[calc(100dvh-7rem)] max-w-[calc(100vw-1.5rem)]",
          "flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl",
          "transition-all duration-300 origin-bottom-right",
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none",
        )}
      >
        <header className="flex shrink-0 items-center gap-2 border-b border-border bg-background/80 px-3 py-2.5 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Toggle chat history"
            aria-pressed={sidebarOpen}
            className={cn(
              "rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
              sidebarOpen && "bg-secondary text-foreground",
            )}
          >
            <PanelLeft className="size-4" />
          </button>

          <div className="flex flex-1 items-center gap-2 overflow-hidden">
            <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Bot className="size-3.5" />
            </div>
            <span className="truncate text-sm font-semibold text-foreground">
              {activeSession?.title ?? "Ask about Elena"}
            </span>
          </div>

          <button
            type="button"
            onClick={handleNew}
            aria-label="New chat"
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <MessageSquarePlus className="size-4" />
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close assistant"
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </header>

        <div className="relative flex flex-1 overflow-hidden">
          <div
            className={cn(
              "absolute inset-y-0 left-0 z-10 transition-transform duration-300",
              sidebarOpen ? "translate-x-0" : "-translate-x-full",
            )}
          >
            <ChatSidebar
              sessions={sessions}
              activeChatId={activeChatId}
              onSelect={handleSelect}
              onNew={handleNew}
              onDelete={onDelete}
              onClearAll={onClearAll}
            />
          </div>

          <div
            className={cn(
              "flex flex-1 flex-col overflow-hidden transition-all duration-300",
              sidebarOpen ? "ml-56" : "ml-0",
            )}
          >
            <ChatMessages
              messages={activeSession?.messages ?? []}
              isStreaming={isStreaming}
              streamingContent={streamingContent}
              onSuggest={(q) => onSend(q)}
            />
            <ChatInput
              onSend={onSend}
              onStop={onStop}
              isStreaming={isStreaming}
            />
          </div>
        </div>
      </div>
    </>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { portfolioIdentity } from "@/modules/portfolio/lib/data/identity.data"
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
  const t = useTranslations("chatbot")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const panel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const previousFocus = document.activeElement as HTMLElement | null
    panel.current?.querySelector<HTMLTextAreaElement>("textarea")?.focus()
    return () => previousFocus?.focus()
  }, [isOpen])

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
        ref={panel}
        inert={!isOpen}
        role="dialog"
        aria-modal="true"
        aria-label={t("dialogLabel", { name: portfolioIdentity.firstName })}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.stopPropagation()
            onClose()
          }
          if (event.key !== "Tab") return
          const elements = Array.from(panel.current?.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex="0"]',
          ) ?? []).filter((element) => !element.closest("[inert]") && element.getClientRects().length > 0)
          const first = elements[0]
          const last = elements[elements.length - 1]
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last?.focus()
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first?.focus()
          }
        }}
        className={cn(
          "fixed bottom-24 right-6 z-50 flex h-[600px] w-[420px] max-h-[calc(100dvh-7rem)] max-w-[calc(100vw-1.5rem)]",
          "flex-col overflow-hidden rounded-lg border border-border bg-background shadow-2xl",
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
            aria-label={t("toggleHistory")}
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
              {activeSession?.title ?? t("defaultTitle", { name: portfolioIdentity.firstName })}
            </span>
          </div>

          <button
            type="button"
            onClick={handleNew}
            aria-label={t("newChat")}
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <MessageSquarePlus className="size-4" />
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label={t("closeAssistant")}
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </header>

        <div className="relative flex flex-1 overflow-hidden">
          <div
            inert={!sidebarOpen}
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

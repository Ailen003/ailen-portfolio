"use client"

import { Trash2, MessageSquarePlus, Trash } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ChatSession } from "../lib/types/chatbot.types"

interface ChatSidebarProps {
  sessions: ChatSession[]
  activeChatId: string | null
  onSelect: (id: string) => void
  onNew: () => void
  onDelete: (id: string) => void
  onClearAll: () => void
}

function relativeTime(ts: number): string {
  const diff = Date.now() - ts
  const mins = Math.floor(diff / 60_000)
  const hours = Math.floor(diff / 3_600_000)
  const days = Math.floor(diff / 86_400_000)
  if (mins < 1) return "Just now"
  if (mins < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return new Date(ts).toLocaleDateString()
}

export function ChatSidebar({
  sessions,
  activeChatId,
  onSelect,
  onNew,
  onDelete,
  onClearAll,
}: ChatSidebarProps) {
  const sorted = [...sessions].sort((a, b) => b.updatedAt - a.updatedAt)

  return (
    <div className="flex h-full w-56 shrink-0 flex-col border-r border-border bg-secondary/20">
      <div className="flex items-center justify-between border-b border-border px-3 py-3">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">History</span>
        <button
          type="button"
          onClick={onNew}
          aria-label="New chat"
          className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-primary hover:bg-primary/10 transition-colors"
        >
          <MessageSquarePlus className="size-3.5" />
          New
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-1.5">
        {sorted.length === 0 ? (
          <p className="px-3 py-4 text-center text-xs text-muted-foreground">No previous chats</p>
        ) : (
          sorted.map((session) => (
            <div
              key={session.id}
              className={cn(
                "group relative flex cursor-pointer flex-col gap-0.5 px-3 py-2.5 transition-colors",
                "hover:bg-secondary",
                session.id === activeChatId && "bg-secondary",
              )}
              onClick={() => onSelect(session.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onSelect(session.id)}
              aria-label={`Open chat: ${session.title}`}
              aria-current={session.id === activeChatId ? "true" : undefined}
            >
              <span className="line-clamp-2 pr-6 text-xs font-medium text-foreground leading-snug">
                {session.title}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {relativeTime(session.updatedAt)}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(session.id)
                }}
                aria-label={`Delete chat: ${session.title}`}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground opacity-0 transition-all hover:text-destructive group-hover:opacity-100"
              >
                <Trash2 className="size-3" />
              </button>
            </div>
          ))
        )}
      </div>

      {sessions.length > 0 && (
        <div className="border-t border-border p-2">
          <button
            type="button"
            onClick={onClearAll}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <Trash className="size-3" />
            Clear all chats
          </button>
        </div>
      )}
    </div>
  )
}

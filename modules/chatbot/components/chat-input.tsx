"use client"

import { useRef, useState, useCallback, type KeyboardEvent, type ChangeEvent } from "react"
import { Send, Square } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatInputProps {
  onSend: (text: string) => void
  onStop: () => void
  isStreaming: boolean
  disabled?: boolean
}

export function ChatInput({ onSend, onStop, isStreaming, disabled }: ChatInputProps) {
  const [value, setValue] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const resize = useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`
  }, [])

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    resize()
  }

  const handleSubmit = () => {
    const trimmed = value.trim()
    if (!trimmed || isStreaming) return
    onSend(trimmed)
    setValue("")
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="border-t border-border bg-background px-3 py-3">
      <div className="flex items-end gap-2 rounded-2xl border border-border bg-secondary/30 px-3 py-2 transition-colors focus-within:border-primary/50 focus-within:bg-background">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask about Elena…"
          disabled={disabled}
          rows={1}
          aria-label="Message input"
          className={cn(
            "flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground",
            "outline-none scrollbar-thin max-h-[140px] min-h-[22px] py-0.5",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
        />
        <button
          type="button"
          onClick={isStreaming ? onStop : handleSubmit}
          disabled={!isStreaming && (!value.trim() || disabled)}
          aria-label={isStreaming ? "Stop generating" : "Send message"}
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-lg transition-all",
            isStreaming
              ? "bg-destructive/10 text-destructive hover:bg-destructive/20"
              : "bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed",
          )}
        >
          {isStreaming ? <Square className="size-3 fill-current" /> : <Send className="size-3.5" />}
        </button>
      </div>
      <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  )
}

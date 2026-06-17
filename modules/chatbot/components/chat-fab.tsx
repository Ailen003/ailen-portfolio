"use client"

import { Bot, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatFabProps {
  isOpen: boolean
  onClick: () => void
}

export function ChatFab({ isOpen, onClick }: ChatFabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full shadow-lg transition-all duration-300",
        "bg-primary text-primary-foreground",
        "hover:scale-105 hover:shadow-xl active:scale-95",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      )}
    >
      <span
        className={cn(
          "absolute transition-all duration-200",
          isOpen ? "rotate-90 opacity-100 scale-100" : "rotate-0 opacity-0 scale-50",
        )}
      >
        <X className="size-5" />
      </span>
      <span
        className={cn(
          "absolute transition-all duration-200",
          isOpen ? "-rotate-90 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100",
        )}
      >
        <Bot className="size-5" />
      </span>
    </button>
  )
}

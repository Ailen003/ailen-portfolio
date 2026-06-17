"use client"

import { useState, useCallback, useRef } from "react"
import { PORTFOLIO_SYSTEM_PROMPT } from "../data/portfolio-context"
import { MAX_MESSAGES_PER_SESSION, AUTO_TITLE_MAX_LENGTH } from "../config/chatbot.config"
import { useChatStore } from "./use-chat-store"
import type { ChatMessage, ChatSession } from "../types/chatbot.types"

function makeId(): string {
  return crypto.randomUUID()
}

function buildTitle(text: string): string {
  const trimmed = text.trim().replace(/\s+/g, " ")
  return trimmed.length > AUTO_TITLE_MAX_LENGTH
    ? trimmed.slice(0, AUTO_TITLE_MAX_LENGTH).trimEnd() + "…"
    : trimmed
}

export function useChatbot() {
  const store = useChatStore()
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingContent, setStreamingContent] = useState("")
  const abortRef = useRef<AbortController | null>(null)

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isStreaming) return

      let session: ChatSession
      if (!store.activeSession) {
        session = store.createSession()
      } else {
        session = store.activeSession
      }

      const userMessage: ChatMessage = {
        id: makeId(),
        role: "user",
        content: text.trim(),
        createdAt: Date.now(),
      }

      const isFirstMessage = session.messages.length === 0

      const updatedMessages = [...session.messages, userMessage].slice(-MAX_MESSAGES_PER_SESSION)

      const sessionWithUser: ChatSession = {
        ...session,
        messages: updatedMessages,
        title: isFirstMessage ? buildTitle(text) : session.title,
        updatedAt: Date.now(),
      }
      store.updateSession(sessionWithUser)

      const groqMessages = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }))

      setIsStreaming(true)
      setStreamingContent("")

      abortRef.current = new AbortController()

      try {
        const response = await fetch("/api/groq", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: groqMessages,
            systemPrompt: PORTFOLIO_SYSTEM_PROMPT,
          }),
          signal: abortRef.current.signal,
        })

        if (!response.ok || !response.body) {
          throw new Error(`API error: ${response.status}`)
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let accumulated = ""

        while (true) {
          const { value, done } = await reader.read()
          if (done) break

          const raw = decoder.decode(value, { stream: true })
          const lines = raw.split("\n")

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue
            const payload = line.slice(6)
            if (payload === "[DONE]") break
            const token = payload.replace(/\\n/g, "\n")
            accumulated += token
            setStreamingContent(accumulated)
          }
        }

        const assistantMessage: ChatMessage = {
          id: makeId(),
          role: "assistant",
          content: accumulated,
          createdAt: Date.now(),
        }

        const finalSession: ChatSession = {
          ...sessionWithUser,
          messages: [...sessionWithUser.messages, assistantMessage].slice(-MAX_MESSAGES_PER_SESSION),
          updatedAt: Date.now(),
        }
        store.updateSession(finalSession)
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return

        const errorMessage: ChatMessage = {
          id: makeId(),
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
          createdAt: Date.now(),
        }
        const errorSession: ChatSession = {
          ...sessionWithUser,
          messages: [...sessionWithUser.messages, errorMessage],
          updatedAt: Date.now(),
        }
        store.updateSession(errorSession)
      } finally {
        setIsStreaming(false)
        setStreamingContent("")
        abortRef.current = null
      }
    },
    [isStreaming, store],
  )

  const abortStream = useCallback(() => {
    abortRef.current?.abort()
  }, [])

  return {
    ...store,
    isStreaming,
    streamingContent,
    sendMessage,
    abortStream,
  }
}

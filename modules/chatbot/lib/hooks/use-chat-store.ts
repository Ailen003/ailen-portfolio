"use client"

import { useState, useEffect, useCallback } from "react"
import { CHATBOT_STORAGE_KEY, MAX_CHATS } from "../config/chatbot.config"
import type { ChatSession, ChatStore } from "../types/chatbot.types"

function readStore(): ChatStore {
  if (typeof window === "undefined") return { sessions: [], activeChatId: null }
  try {
    const raw = localStorage.getItem(CHATBOT_STORAGE_KEY)
    if (!raw) return { sessions: [], activeChatId: null }
    return JSON.parse(raw) as ChatStore
  } catch {
    return { sessions: [], activeChatId: null }
  }
}

function writeStore(store: ChatStore): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(CHATBOT_STORAGE_KEY, JSON.stringify(store))
  } catch {
    // localStorage quota exceeded — do nothing
  }
}

function purgeOldest(sessions: ChatSession[]): ChatSession[] {
  if (sessions.length <= MAX_CHATS) return sessions
  const sorted = [...sessions].sort((a, b) => a.updatedAt - b.updatedAt)
  return sorted.slice(sessions.length - MAX_CHATS)
}

export function useChatStore() {
  const [store, setStore] = useState<ChatStore>({ sessions: [], activeChatId: null })

  useEffect(() => {
    const stored = readStore()
    setStore(stored)
  }, [])

  const persist = useCallback((next: ChatStore) => {
    setStore(next)
    writeStore(next)
  }, [])

  const createSession = useCallback((): ChatSession => {
    const session: ChatSession = {
      id: crypto.randomUUID(),
      title: "New chat",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      messages: [],
    }
    setStore((prev) => {
      const sessions = purgeOldest([...prev.sessions, session])
      const next: ChatStore = { sessions, activeChatId: session.id }
      writeStore(next)
      return next
    })
    return session
  }, [])

  const deleteSession = useCallback(
    (id: string) => {
      setStore((prev) => {
        const sessions = prev.sessions.filter((s) => s.id !== id)
        const activeChatId =
          prev.activeChatId === id
            ? (sessions[sessions.length - 1]?.id ?? null)
            : prev.activeChatId
        const next: ChatStore = { sessions, activeChatId }
        writeStore(next)
        return next
      })
    },
    [],
  )

  const updateSession = useCallback((session: ChatSession) => {
    setStore((prev) => {
      const sessions = prev.sessions.map((s) =>
        s.id === session.id ? { ...session, updatedAt: Date.now() } : s,
      )
      const next: ChatStore = { ...prev, sessions }
      writeStore(next)
      return next
    })
  }, [])

  const setActiveChatId = useCallback((id: string | null) => {
    setStore((prev) => {
      const next: ChatStore = { ...prev, activeChatId: id }
      writeStore(next)
      return next
    })
  }, [])

  const clearAll = useCallback(() => {
    persist({ sessions: [], activeChatId: null })
  }, [persist])

  const activeSession = store.sessions.find((s) => s.id === store.activeChatId) ?? null

  return {
    sessions: store.sessions,
    activeChatId: store.activeChatId,
    activeSession,
    createSession,
    deleteSession,
    updateSession,
    setActiveChatId,
    clearAll,
  }
}

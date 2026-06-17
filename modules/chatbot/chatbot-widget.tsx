"use client"

import { useState, useCallback } from "react"
import { ChatFab } from "./components/chat-fab"
import { ChatPanel } from "./components/chat-panel"
import { useChatbot } from "./lib/hooks/use-chatbot"

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const {
    sessions,
    activeChatId,
    activeSession,
    isStreaming,
    streamingContent,
    sendMessage,
    abortStream,
    createSession,
    deleteSession,
    setActiveChatId,
    clearAll,
  } = useChatbot()

  const handleOpen = useCallback(() => {
    setIsOpen(true)
    if (!activeChatId && sessions.length === 0) {
      createSession()
    }
  }, [activeChatId, sessions.length, createSession])

  const handleToggle = useCallback(() => {
    if (isOpen) {
      setIsOpen(false)
    } else {
      handleOpen()
    }
  }, [isOpen, handleOpen])

  const handleNew = useCallback(() => {
    createSession()
  }, [createSession])

  return (
    <>
      <ChatFab isOpen={isOpen} onClick={handleToggle} />
      <ChatPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        sessions={sessions}
        activeChatId={activeChatId}
        activeSession={activeSession}
        isStreaming={isStreaming}
        streamingContent={streamingContent}
        onSend={sendMessage}
        onStop={abortStream}
        onNew={handleNew}
        onSelect={setActiveChatId}
        onDelete={deleteSession}
        onClearAll={clearAll}
      />
    </>
  )
}

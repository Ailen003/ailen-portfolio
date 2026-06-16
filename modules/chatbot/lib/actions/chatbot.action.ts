"use server"

import { sendMessage } from "../services/groq-chat.service"
import type { ChatResult, SendMessageOptions } from "../types/chatbot.types"

export async function sendChatMessage(options: SendMessageOptions): Promise<ChatResult> {
  if (!options.messages || options.messages.length === 0) {
    return { ok: false, error: "At least one message is required", code: "EMPTY_MESSAGES" }
  }

  return sendMessage(options)
}

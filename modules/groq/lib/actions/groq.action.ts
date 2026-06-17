"use server"

import { sendMessage } from "../services/groq.service"
import type { ChatResult, SendMessageOptions } from "../types/groq.types"

export async function sendChatMessage(options: SendMessageOptions): Promise<ChatResult> {
  if (!options.messages || options.messages.length === 0) {
    return { ok: false, error: "At least one message is required", code: "EMPTY_MESSAGES" }
  }

  return sendMessage(options)
}

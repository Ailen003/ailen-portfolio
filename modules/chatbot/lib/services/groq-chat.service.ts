import type { ChatMessage, ChatResult, SendMessageOptions, StreamMessageOptions } from "../types/chatbot.types"
import { DEFAULT_MAX_TOKENS, DEFAULT_MODEL, DEFAULT_TEMPERATURE, MAX_HISTORY_MESSAGES } from "../config/chatbot.config"
import { getGroqClient } from "./groq.client"

function buildMessages(options: SendMessageOptions): ChatMessage[] {
  const { messages, systemPrompt } = options
  const trimmed = messages.slice(-MAX_HISTORY_MESSAGES)
  if (!systemPrompt) return trimmed
  return [{ role: "system", content: systemPrompt }, ...trimmed]
}

export async function sendMessage(options: SendMessageOptions): Promise<ChatResult> {
  const { model = DEFAULT_MODEL, temperature = DEFAULT_TEMPERATURE, maxTokens = DEFAULT_MAX_TOKENS } = options

  if (!options.messages.length) {
    return { ok: false, error: "messages array must not be empty", code: "EMPTY_MESSAGES" }
  }

  try {
    const client = getGroqClient()
    const messages = buildMessages(options)

    const completion = await client.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
      stream: false,
    })

    const choice = completion.choices[0]
    if (!choice?.message?.content) {
      return { ok: false, error: "No content in Groq response", code: "EMPTY_RESPONSE" }
    }

    return {
      ok: true,
      content: choice.message.content,
      model: completion.model,
      usage: {
        promptTokens: completion.usage?.prompt_tokens ?? 0,
        completionTokens: completion.usage?.completion_tokens ?? 0,
        totalTokens: completion.usage?.total_tokens ?? 0,
      },
    }
  } catch (err) {
    if (err instanceof Error) {
      const code = ("status" in err ? String((err as { status: unknown }).status) : undefined)
      return { ok: false, error: err.message, code }
    }
    return { ok: false, error: "Unknown error communicating with Groq", code: "UNKNOWN" }
  }
}

export async function streamMessage(options: StreamMessageOptions): Promise<ReadableStream<string>> {
  const {
    model = DEFAULT_MODEL,
    temperature = DEFAULT_TEMPERATURE,
    maxTokens = DEFAULT_MAX_TOKENS,
    signal,
  } = options

  if (!options.messages.length) {
    throw new Error("messages array must not be empty")
  }

  const client = getGroqClient()
  const messages = buildMessages(options)

  const groqStream = await client.chat.completions.create(
    {
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
      stream: true,
    },
    { signal },
  )

  let cancelled = false

  return new ReadableStream<string>({
    async start(controller) {
      try {
        for await (const chunk of groqStream) {
          if (cancelled) break
          const delta = chunk.choices[0]?.delta?.content
          if (delta) controller.enqueue(delta)
        }
        if (!cancelled) controller.close()
      } catch (err) {
        if (!cancelled) controller.error(err)
      }
    },
    cancel() {
      cancelled = true
    },
  })
}

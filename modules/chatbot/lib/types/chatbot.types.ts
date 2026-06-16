export enum GroqModel {
  Llama33_70b = "llama-3.3-70b-versatile",
  Llama31_8b = "llama-3.1-8b-instant",
  Llama3_8b = "llama3-8b-8192",
  Gemma2_9b = "gemma2-9b-it",
  Mixtral_8x7b = "mixtral-8x7b-32768",
}

export type ChatRole = "system" | "user" | "assistant"

export interface ChatMessage {
  role: ChatRole
  content: string
}

export interface TokenUsage {
  promptTokens: number
  completionTokens: number
  totalTokens: number
}

export interface SendMessageOptions {
  messages: ChatMessage[]
  model?: GroqModel
  temperature?: number
  maxTokens?: number
  systemPrompt?: string
}

export interface StreamMessageOptions extends SendMessageOptions {
  signal?: AbortSignal
}

export type ChatResult =
  | { ok: true; content: string; model: string; usage: TokenUsage }
  | { ok: false; error: string; code?: string }

export interface GroqModelMeta {
  id: GroqModel
  label: string
  contextWindow: number
  description: string
}

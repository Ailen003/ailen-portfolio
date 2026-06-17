import { NextRequest, NextResponse } from "next/server"
import { streamMessage } from "@/modules/groq/lib/services/groq.service"
import type { SendMessageOptions } from "@/modules/groq/lib/types/groq.types"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { messages, model, temperature, maxTokens, systemPrompt } = body as Record<string, unknown>

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "messages is required and must be a non-empty array" },
      { status: 400 },
    )
  }

  const options: SendMessageOptions = {
    messages: messages as SendMessageOptions["messages"],
    ...(model !== undefined && { model: model as SendMessageOptions["model"] }),
    ...(temperature !== undefined && { temperature: temperature as number }),
    ...(maxTokens !== undefined && { maxTokens: maxTokens as number }),
    ...(systemPrompt !== undefined && { systemPrompt: systemPrompt as string }),
  }

  try {
    const textStream = await streamMessage({ ...options, signal: request.signal })

    const encoder = new TextEncoder()
    const sseStream = textStream.pipeThrough(
      new TransformStream<string, Uint8Array>({
        transform(chunk, controller) {
          const escaped = chunk.replace(/\n/g, "\\n")
          controller.enqueue(encoder.encode(`data: ${escaped}\n\n`))
        },
        flush(controller) {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"))
        },
      }),
    )

    return new Response(sseStream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "X-Accel-Buffering": "no",
        Connection: "keep-alive",
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error"
    const isApiKeyError = message.includes("GROQ_API_KEY")
    return NextResponse.json(
      { error: isApiKeyError ? "Chatbot service is not configured" : message },
      { status: isApiKeyError ? 503 : 500 },
    )
  }
}

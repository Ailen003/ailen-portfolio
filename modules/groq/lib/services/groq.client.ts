import Groq from "groq-sdk"

let client: Groq | null = null

export function getGroqClient(): Groq {
  if (client) return client

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    throw new Error(
      "GROQ_API_KEY environment variable is not set. " +
        "Get a free key at https://console.groq.com/keys",
    )
  }

  client = new Groq({ apiKey })
  return client
}

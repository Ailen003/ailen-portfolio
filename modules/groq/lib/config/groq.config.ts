import { GroqModel } from "../types/groq.types"
import type { GroqModelMeta } from "../types/groq.types"

export const GROQ_MODELS: Record<GroqModel, GroqModelMeta> = {
  [GroqModel.Llama33_70b]: {
    id: GroqModel.Llama33_70b,
    label: "Llama 3.3 70B",
    contextWindow: 128_000,
    description: "Most capable free model. Best for complex reasoning and nuanced responses.",
  },
  [GroqModel.Llama31_8b]: {
    id: GroqModel.Llama31_8b,
    label: "Llama 3.1 8B",
    contextWindow: 128_000,
    description: "Fastest free model. Ideal for quick responses and simple tasks.",
  },
  [GroqModel.Llama3_8b]: {
    id: GroqModel.Llama3_8b,
    label: "Llama 3 8B",
    contextWindow: 8_192,
    description: "Lightweight and efficient for general-purpose conversations.",
  },
  [GroqModel.Gemma2_9b]: {
    id: GroqModel.Gemma2_9b,
    label: "Gemma 2 9B",
    contextWindow: 8_192,
    description: "Google's open model. Great for instruction-following and chat.",
  },
  [GroqModel.Mixtral_8x7b]: {
    id: GroqModel.Mixtral_8x7b,
    label: "Mixtral 8x7B",
    contextWindow: 32_768,
    description: "Mixture-of-experts model. Strong multilingual and coding performance.",
  },
}

export const DEFAULT_MODEL = GroqModel.Llama33_70b

export const DEFAULT_TEMPERATURE = 0.7

export const DEFAULT_MAX_TOKENS = 1024

export const MAX_HISTORY_MESSAGES = 20

export const GROQ_API_BASE_URL = "https://api.groq.com/openai/v1"

// types/model.ts
export interface ModelInfo {
  name: string;
  id: string;
  logo: string;
  description: string;
  isOfficial?: boolean;
  badge?: string;
}

export const MODELS: ModelInfo[] = [
  {
    name: "XXXAI",
    id: "xxxai",
    logo: "https://assets.monica.im/home-web/_next/static/media/monicaLogo.83e0ae18.png",
    description:
      "Next-generation AI assistant developed by the Monica team. It features powerful multimodal capabilities and supports images, audio, and video inputs.",
  },
  {
    name: "Claude 4 Sonnet",
    id: "claude_4_sonnet",
    logo: "https://files.monica-cdn.im/assets/img/apps_avatar/claude-star-100x100.png",
    description:
      "Anthropic’s latest model with strong reasoning and generation capabilities, suitable for complex tasks.",
    badge: "Pro",
  },
  {
    name: "Claude 4 Opus",
    id: "claude_4_opus",
    logo: "https://files.monica-cdn.im/assets/img/apps_avatar/claude-star-100x100.png",
    description:
      "Anthropic’s advanced model supporting longer context and more complex tasks for professional users.",
    badge: "Pro Max",
  },
  {
    name: "DeepSeek V3",
    id: "deepseek-v3",
    logo: "https://files.monica-cdn.im/assets/img/apps_avatar/deepseek-chat.png",
    description:
      "DeepSeek’s latest release, specialized in deep learning and technical problem-solving.",
  },
  {
    name: "DeepSeek R1",
    id: "deepseek-r1",
    logo: "https://files.monica-cdn.im/assets/img/apps_avatar/deepseek-chat.png",
    description:
      "DeepSeek’s research-focused model for academic and scientific innovation.",
  },
  {
    name: "Grok 3",
    id: "grok3",
    logo: "https://files.monica-cdn.im/assets/img/apps_avatar/groq-beta.png",
    description:
      "xAI’s next-generation model, known for creativity and a unique sense of humor.",
  },
  {
    name: "GPT-4o",
    id: "gpt4o",
    logo: "https://files.monica-cdn.im/assets/img/apps_avatar/gpt-4.png",
    description:
      "OpenAI’s advanced model with excellent reasoning and text generation capabilities.",
    badge: "Plus",
  },
  {
    name: "GPT-4.1",
    id: "gpt41",
    logo: "https://files.monica-cdn.im/assets/img/apps_avatar/gpt-4.png",
    description:
      "OpenAI’s latest model with state-of-the-art performance across multiple domains.",
    badge: "New",
  },
  {
    name: "Claude 4 Sonnet Thinking",
    id: "claude4-sonnet-thinking",
    logo: "https://files.monica-cdn.im/assets/img/apps_avatar/claude-star-100x100.png",
    description:
      "Enhanced reasoning version of Claude 4 Sonnet, designed for analytical tasks.",
    badge: "Pro+",
  },
  {
    name: "Claude 4 Opus Thinking",
    id: "claude4-opus-thinking",
    logo: "https://files.monica-cdn.im/assets/img/apps_avatar/claude-star-100x100.png",
    description:
      "Enhanced reasoning version of Claude 4 Opus, ideal for complex problem-solving.",
    badge: "Pro Max+",
  },
  {
    name: "Claude 3.7 Sonnet",
    id: "claude37-sonnet",
    logo: "https://files.monica-cdn.im/assets/img/apps_avatar/claude-star-100x100.png",
    description: "Stable and reliable version of Claude 3.7 for everyday use.",
  },
  {
    name: "Claude 3.7 Sonnet Thinking",
    id: "claude37-sonnet-thinking",
    logo: "https://files.monica-cdn.im/assets/img/apps_avatar/claude-star-100x100.png",
    description:
      "Reasoning-optimized version of Claude 3.7 Sonnet with enhanced logical analysis.",
  },
  {
    name: "Claude 3.5 Sonnet V2",
    id: "claude35-sonnet-v2",
    logo: "https://files.monica-cdn.im/assets/img/apps_avatar/claude-star-100x100.png",
    description:
      "Upgraded Claude 3.5 Sonnet, offering more stable performance.",
  },
  {
    name: "o3",
    id: "o3",
    logo: "https://files.monica-cdn.im/assets/img/apps_avatar/gpt-4.png",
    description: "AI model focused on creativity and innovation.",
  },
  {
    name: "o4-mini",
    id: "o4-mini",
    logo: "https://files.monica-cdn.im/assets/img/apps_avatar/gpt-4.png",
    description: "Lightweight o4 variant for quick responses and simple tasks.",
  },
  {
    name: "Perplexity Reasoning",
    id: "perplexity-reasoning",
    logo: "https://files.monica-cdn.im/assets/img/apps-avatar/perplexity.png",
    description:
      "Reasoning-optimized version of Perplexity, focused on logic and analysis.",
  },
  {
    name: "Perplexity",
    id: "perplexity",
    logo: "https://files.monica-cdn.im/assets/img/apps-avatar/perplexity.png",
    description:
      "Strong at answering complex queries and knowledge exploration.",
  },
  {
    name: "Claude 3.5 Haiku",
    id: "claude35-haiku",
    logo: "https://files.monica-cdn.im/assets/img/apps_avatar/claude-star-100x100.png",
    description:
      "Lightweight Claude 3.5 variant for short conversations and fast responses.",
  },
  {
    name: "GPT-4.1 Mini",
    id: "gpt41-mini",
    logo: "https://files.monica-cdn.im/assets/img/apps_avatar/gpt-4.png",
    description:
      "Lightweight GPT-4.1 variant, optimized for speed while maintaining quality.",
  },
  {
    name: "GPT-4.1 Nano",
    id: "gpt41-nano",
    logo: "https://files.monica-cdn.im/assets/img/apps_avatar/gpt-4.png",
    description: "Ultra-light GPT-4.1 variant for basic and fast tasks.",
  },
  {
    name: "GPT-4o Mini",
    id: "gpt4o-mini",
    logo: "https://files.monica-cdn.im/assets/img/apps_avatar/openai-o1-v2.png",
    description:
      "Lightweight GPT-4o variant for general-purpose conversations.",
  },
  {
    name: "Gemini 2.5 Flash",
    id: "gemini25-flash",
    logo: "https://files.monica-cdn.im/assets/png/gemini.png",
    description:
      "Google’s fast-response AI model, designed for real-time interaction.",
  },
  {
    name: "Gemini 2.5 Pro",
    id: "gemini25-pro",
    logo: "https://files.monica-cdn.im/assets/png/gemini.png",
    description:
      "Google’s professional AI model with strong analysis and generation capabilities.",
    badge: "Pro",
  },
  {
    name: "Qwen3 235B",
    id: "qwen3-235b",
    logo: "https://files.monica-cdn.im/assets/img/apps_avatar/qwen.png",
    description:
      "Alibaba’s large-scale language model optimized for Chinese understanding and generation.",
  },
  {
    name: "Llama 3.1 405B",
    id: "llama31-405b",
    logo: "https://files.monica-cdn.im/assets/png/llama_3.1_405b.png",
    description:
      "Meta’s large-scale open-source model with strong general-purpose capabilities.",
  },
  {
    name: "Llama 3.1 70B Ultra-Fast",
    id: "llama31-70b-ultra-fast",
    logo: "https://files.monica-cdn.im/assets/img/llama-70b.png",
    description:
      "High-speed Llama 3.1 variant, providing faster responses with high-quality output.",
  },
  {
    name: "GPT-4",
    id: "gpt4",
    logo: "https://files.monica-cdn.im/assets/img/apps_avatar/gpt-4.png",
    description:
      "OpenAI’s classic model with strong general-purpose capabilities.",
  },
  {
    name: "DALL·E 3",
    id: "dalle3",
    logo: "https://files.monica-cdn.im/assets/img/apps_avatar/dall3_chat.jpeg",
    description:
      "OpenAI’s image generation model for high-quality artwork and visual content.",
    badge: "Art",
  },
  {
    name: "Mistral",
    id: "mistral",
    logo: "/Mistral-AI.png",
    description: "Mistral Ai",
    badge: "Chat",
  },
];

// Model name to ID mapping
export const MODEL_NAME_TO_ID = MODELS.reduce((acc, model) => {
  acc[model.name] = model.id;
  return acc;
}, {} as { [key: string]: string });

// ID to model name mapping
export const MODEL_ID_TO_NAME = MODELS.reduce((acc, model) => {
  acc[model.id] = model.name;
  return acc;
}, {} as { [key: string]: string });

// Get model by ID
export const getModelById = (id: string): ModelInfo | undefined => {
  return MODELS.find((model) => model.id === id);
};

// Get model by name
export const getModelByName = (name: string): ModelInfo | undefined => {
  return MODELS.find((model) => model.name === name);
};

// Default model
export const DEFAULT_MODEL: ModelInfo = MODELS[0];

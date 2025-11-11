/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OPENAI_API_KEY?: string;
  readonly VITE_ANTHROPIC_API_KEY?: string;
  readonly VITE_GOOGLE_API_KEY?: string;
  readonly VITE_XAI_API_KEY?: string;
  readonly VITE_DEEPSEEK_API_KEY?: string;
  readonly VITE_MISTRAL_API_KEY?: string;
  // Add more as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

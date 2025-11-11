/**
 * API Configuration
 * Centralized configuration for all AI model API keys and endpoints
 */

export const API_CONFIG = {
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    baseUrl: 'https://api.openai.com/v1',
    models: ['gpt-4', 'gpt-4o']
  },
  anthropic: {
    apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
    baseUrl: 'https://api.anthropic.com/v1',
    models: ['claude-3-opus-20240229', 'claude-3-5-sonnet-20241022']
  },
  google: {
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    baseUrl: 'https://generativelanguage.googleapis.com/v1',
    models: ['gemini-ultra', 'gemini-pro']
  },
  xai: {
    apiKey: import.meta.env.VITE_XAI_API_KEY,
    baseUrl: 'https://api.x.ai/v1',
    models: ['grok-2']
  },
  deepseek: {
    apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY,
    baseUrl: 'https://api.deepseek.com/v1',
    models: ['deepseek-chat', 'deepseek-coder']
  },
  mistral: {
    apiKey: import.meta.env.VITE_MISTRAL_API_KEY,
    baseUrl: 'https://api.mistral.ai/v1',
    models: ['mistral-large-latest']
  },
  perplexity: {
    apiKey: import.meta.env.VITE_PERPLEXITY_API_KEY,
    baseUrl: 'https://api.perplexity.ai',
    models: ['llama-3.1-sonar-large-128k-online']
  }
};

/**
 * Check if API key is configured for a provider
 */
export function isApiKeyConfigured(provider: keyof typeof API_CONFIG): boolean {
  return !!API_CONFIG[provider]?.apiKey && API_CONFIG[provider].apiKey !== '';
}

/**
 * Get all configured providers
 */
export function getConfiguredProviders(): string[] {
  return Object.keys(API_CONFIG).filter(provider =>
    isApiKeyConfigured(provider as keyof typeof API_CONFIG)
  );
}

/**
 * Validate API key format (basic check)
 */
export function validateApiKey(provider: keyof typeof API_CONFIG): {
  valid: boolean;
  message?: string;
} {
  const apiKey = API_CONFIG[provider]?.apiKey;

  if (!apiKey) {
    return { valid: false, message: `No API key configured for ${provider}` };
  }

  // Basic length and format validation
  if (apiKey.length < 20) {
    return { valid: false, message: 'API key appears to be too short' };
  }

  return { valid: true };
}

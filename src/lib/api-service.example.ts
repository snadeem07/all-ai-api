/**
 * Example API Service
 * This file demonstrates how to safely make API calls to AI models
 *
 * IMPORTANT SECURITY NOTES:
 * 1. In production, API calls should go through your backend server
 * 2. Never expose API keys in client-side code in production
 * 3. This is for development/demo purposes only
 */

import { API_CONFIG, isApiKeyConfigured } from './api-config';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatResponse {
  content: string;
  model: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

/**
 * Example: Call OpenAI API
 */
export async function callOpenAI(
  messages: ChatMessage[],
  model: string = 'gpt-4'
): Promise<ChatResponse> {
  if (!isApiKeyConfigured('openai')) {
    throw new Error('OpenAI API key not configured');
  }

  const response = await fetch(`${API_CONFIG.openai.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_CONFIG.openai.apiKey}`
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 1000
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();

  return {
    content: data.choices[0].message.content,
    model: data.model,
    usage: {
      promptTokens: data.usage.prompt_tokens,
      completionTokens: data.usage.completion_tokens,
      totalTokens: data.usage.total_tokens
    }
  };
}

/**
 * Example: Call Anthropic Claude API
 */
export async function callClaude(
  messages: ChatMessage[],
  model: string = 'claude-3-5-sonnet-20241022'
): Promise<ChatResponse> {
  if (!isApiKeyConfigured('anthropic')) {
    throw new Error('Anthropic API key not configured');
  }

  // Convert messages format for Claude
  const systemMessage = messages.find(m => m.role === 'system');
  const chatMessages = messages.filter(m => m.role !== 'system');

  const response = await fetch(`${API_CONFIG.anthropic.baseUrl}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_CONFIG.anthropic.apiKey!,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model,
      max_tokens: 1000,
      system: systemMessage?.content,
      messages: chatMessages.map(m => ({
        role: m.role,
        content: m.content
      }))
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Claude API error: ${error.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();

  return {
    content: data.content[0].text,
    model: data.model,
    usage: {
      promptTokens: data.usage.input_tokens,
      completionTokens: data.usage.output_tokens,
      totalTokens: data.usage.input_tokens + data.usage.output_tokens
    }
  };
}

/**
 * Example: Call Google Gemini API
 */
export async function callGemini(
  messages: ChatMessage[],
  model: string = 'gemini-pro'
): Promise<ChatResponse> {
  if (!isApiKeyConfigured('google')) {
    throw new Error('Google API key not configured');
  }

  const prompt = messages.map(m => m.content).join('\n\n');

  const response = await fetch(
    `${API_CONFIG.google.baseUrl}/models/${model}:generateContent?key=${API_CONFIG.google.apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Gemini API error: ${error.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();

  return {
    content: data.candidates[0].content.parts[0].text,
    model
  };
}

/**
 * Generic API caller that routes to the correct provider
 */
export async function callAIModel(
  provider: 'openai' | 'anthropic' | 'google',
  messages: ChatMessage[],
  model?: string
): Promise<ChatResponse> {
  switch (provider) {
    case 'openai':
      return callOpenAI(messages, model);
    case 'anthropic':
      return callClaude(messages, model);
    case 'google':
      return callGemini(messages, model);
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
}

/**
 * Example usage in a component:
 *
 * import { callAIModel } from '@/lib/api-service.example';
 *
 * const handleTest = async () => {
 *   try {
 *     const response = await callAIModel('openai', [
 *       { role: 'user', content: 'Hello!' }
 *     ]);
 *     console.log(response.content);
 *   } catch (error) {
 *     console.error('API call failed:', error);
 *   }
 * };
 */

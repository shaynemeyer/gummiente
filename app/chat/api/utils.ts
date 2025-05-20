import {
  createOpenAI,
  OpenAIProvider,
  OpenAIProviderSettings,
} from "@ai-sdk/openai";
import {
  createOllama,
  OllamaProvider,
  OllamaProviderSettings,
} from "ollama-ai-provider";

const supportedProviders: {
  [key: string]: {
    constructor: (
      options?: OpenAIProviderSettings | OllamaProviderSettings
    ) => OpenAIProvider | OllamaProvider;
    models: string[];
  };
} = {
  openai: {
    constructor: createOpenAI,
    models: ["gpt-3.5-turbo", "gpt-4"],
  },
  ollama: {
    constructor: createOllama,
    models: ["llama3.2"], // todo: fetch this list from utils/supportedModels
  },
};

function getSupportedModel(provider: string, model: string) {
  const providerConfig = supportedProviders[provider];

  if (!providerConfig) {
    throw new Error(`Unsupported provider: ${provider}`);
  }

  const { constructor, models } = providerConfig;

  if (!models.includes(model)) {
    throw new Error(`Unsupported model: ${model} for provider: ${provider}`);
  }

  const apiKey = process.env[`${provider.toUpperCase()}_API_KEY`];

  if (!apiKey) {
    throw new Error(`Missing API key for provider: ${provider}`);
  }

  const providerInstance = constructor({ apiKey });
  return providerInstance(model);
}

export default getSupportedModel;

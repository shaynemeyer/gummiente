// todo: make this per user configurable by moving to a datastore
function supportedProviders(): ValueLabel[] {
  return [
    {
      value: "openai",
      label: "OpenAI",
    },
    {
      value: "ollama",
      label: "Ollama",
    },
  ];
}

function supportedModels(): { [key: string]: ValueLabel[] } {
  return {
    openai: [
      { value: "gpt-3.5-turbo", label: "GPT-3.5-turbo" },
      { value: "gpt-4", label: "GPT-4" },
    ],
    ollama: [
      { value: "llama3.2", label: "Llama3.2" },
      { value: "deepseek-r1:14b", label: "Deepseek r1 14b" },
      { value: "codeqwen", label: "Code Qwen" },
      { value: "phi", label: "PHI" },
    ],
  };
}

export { supportedProviders, supportedModels };

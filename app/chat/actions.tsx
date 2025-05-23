"use server";

import { generateId } from "ai";
import { createAI, getMutableAIState, streamUI } from "ai/rsc";

import getSupportedModel from "./utils";
import ChatBubble from "@/components/chat/ChatBubble";

export async function continueConversation(
  input: string,
  provider: string,
  model: string
) {
  "use server";
  const supportedModel = getSupportedModel(provider, model);
  const history = getMutableAIState();
  const result = await streamUI({
    model: supportedModel,
    messages: [...history.get(), { role: "user", content: input }],
    text: ({ content, done }) => {
      if (done) {
        history.done([...history.get(), { role: "assistant", content: input }]);
      }
      // console.log(content);
      return (
        <ChatBubble
          role="assistant"
          text={content}
          className={`mr-auto border-none`}
        />
      );
    },
  });

  return {
    id: generateId(),
    role: "assistant",
    display: result.value,
  };
}

export const AI = createAI({
  actions: {
    continueConversation,
  },
  initialAIState: [],
  initialUIState: [],
});

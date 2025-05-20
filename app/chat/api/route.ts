import { streamText } from "ai";
import getSupportedModel from "./utils";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const { messages, provider, model } = await req.json();

  const supportedModel = getSupportedModel(provider, model);

  const result = streamText({
    model: supportedModel,
    maxTokens: 512,
    messages: [
      {
        role: "system",
        content:
          "I'm happy to assist you in any way I can. How can I be of service today?",
      },
      ...messages,
    ],
  });

  return result.toDataStreamResponse();
}

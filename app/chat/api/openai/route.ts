import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export const dynamic = "force-dynamic";

const model = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: model("gpt-4o"),
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

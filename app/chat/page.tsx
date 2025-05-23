"use client";

import ChatList from "@/components/chat/ChatList";
import { Textarea } from "@/components/ui/textarea";
import useEnterSubmit from "@/hooks/useEnterSubmit";
import useFocusOnSlashPress from "@/hooks/useFocusOnSlashPress";
import { generateId } from "ai";
import { Brain } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useActions, useUIState } from "ai/rsc";
import { supportedModels, supportedProviders } from "@/lib/supportedProviders";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AIMessage } from "@/lib";

/* 
These export statements ensure that the page is always dynamically 
rendered and has a maximum execution time of 30 seconds, which is 
important for handling streaming responses.
*/
export const dynamic = "force-dynamic";
export const maxDuration = 30;

function ChatPage() {
  const [provider, setProvider] = useState("ollama");
  const [model, setModel] = useState("llama3.2");

  const { formRef, onKeyDown } = useEnterSubmit();
  const inputRef = useFocusOnSlashPress();

  const [input, setInput] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [conversation, setConversation] = useUIState();
  const { continueConversation } = useActions();

  const messageEndRef = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = input.trim();
    setInput("");

    if (!value) return;

    setIsloading(true);
    setConversation((currentConversation: AIMessage[]) => [
      ...currentConversation,
      { id: generateId(), role: "user", content: input },
    ]);

    const message = await continueConversation(input, provider, model);
    setConversation((currentConversation: AIMessage[]) => [
      ...currentConversation,
      message,
    ]);
    setIsloading(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  console.log({ conversation });

  const providers = supportedProviders();
  const models = supportedModels();

  if (!providers.length || !Object.entries(models).length) return null;

  return (
    <>
      <div>
        <div className="flex justify-end gap-4 px-5 absolute right-0">
          <div className="flex flex-col gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div>
                  Provider: {providers.find((p) => p.value === provider)?.label}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {providers.map((p) => (
                  <DropdownMenuItem key={p.value}>{p.label}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div>
                  Model:{" "}
                  {
                    Object.entries(models)
                      .find(([key]) => key === provider)![1]
                      .find((m) => m.value === model)?.label
                  }
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {Object.entries(models)
                  .find(([key]) => key === provider)![1]
                  ?.map((p) => (
                    <DropdownMenuItem key={p.value}>{p.label}</DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex flex-col w-full max-w-4xl mx-auto py-24 stretch overflow-hidden">
          {conversation.length === 0 && (
            <h1 className="text-6xl font-semibold leading-tight mt-4 mb-4">
              <div className="flex flex-row gap-2">
                Hello, I&apos;m{" "}
                <div className="flex flex-row items-center gap-1">
                  <Brain size={50} className="text-green-800" /> Gummi
                </div>
              </div>
              <br />
              <span className="text-gray-400">Ask me anything you want</span>
            </h1>
          )}
          {conversation.length > 0 && (
            <ChatList messages={conversation} isLoading={isLoading} />
          )}
          <div ref={messageEndRef}></div>
          <form
            className="stretch max-w-4xl flex flex-row"
            ref={formRef}
            role="form"
            aria-labelledby="chat-form-label"
            onSubmit={handleOnSubmit}
          >
            <Textarea
              ref={inputRef}
              className="fixed bottom-0 w-full max-w-4xl p-2 mb-8 border border-gray-300 rounded shadow-xl"
              autoFocus
              placeholder="Type your message here..."
              spellCheck={false}
              autoCorrect="off"
              autoComplete="off"
              name="message"
              rows={1}
              tabIndex={0}
              onKeyDown={onKeyDown}
              onChange={handleInputChange}
              value={input}
            />
          </form>
        </div>{" "}
      </div>
    </>
  );
}
export default ChatPage;

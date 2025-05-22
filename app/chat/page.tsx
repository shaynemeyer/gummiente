"use client";

import ChatList from "@/components/chat/ChatList";
import { Textarea } from "@/components/ui/textarea";
import useEnterSubmit from "@/hooks/useEnterSubmit";
import useFocusOnSlashPress from "@/hooks/useFocusOnSlashPress";

import { Brain } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { continueConversation } from "./actions";
import { readStreamableValue } from "ai/rsc";
import { supportedModels, supportedProviders } from "@/lib/supportedProviders";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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
  const [isLoading, setIsloading] = useState(false);
  const [conversationMessages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState("");
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
    setMessages([...conversationMessages, { role: "user", content: "input" }]);

    const { messages, newMessage } = await continueConversation(
      [...conversationMessages, { role: "user", content: input }],
      provider,
      model
    );

    let textContent = "";

    for await (const delta of readStreamableValue(newMessage)) {
      textContent = `${textContent}${delta}`;
      setMessages([...messages, { role: "assistant", content: textContent }]);
    }
    setIsloading(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversationMessages]);

  const providers = supportedProviders();
  const models = supportedModels();

  if (!providers.length || !Object.entries(models).length) return null;

  return (
    <>
      <div className="flex justify-end gap-4 px-5 absolute right-0">
        <div className="flex flex-col gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                Provider: {providers.find((p) => p.value === provider)?.label}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {providers.map((p) => (
                <DropdownMenuItem key={p.value}>{p.label}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                Model:{" "}
                {
                  Object.entries(models)
                    .find(([key]) => key === provider)![1]
                    .find((m) => m.value === model)?.label
                }
              </Button>
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
        {conversationMessages.length === 0 && (
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
        {conversationMessages.length > 0 && (
          <>
            <ChatList messages={conversationMessages} isLoading={isLoading} />
          </>
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
      </div>
    </>
  );
}
export default ChatPage;

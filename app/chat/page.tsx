"use client";

import { Textarea } from "@/components/ui/textarea";
import useFocusOnSlashPress from "@/hooks/useFocusOnSlashPress";
import { Brain } from "lucide-react";
import { useRef } from "react";

function ChatPage() {
  const inputRef = useFocusOnSlashPress();

  const messageEndRef = useRef(null);
  // const scrollToBottom = () => {
  //   messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto py-24 stretch overflow-hidden">
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

      <div ref={messageEndRef}></div>
      <form
        className="stretch max-w-4xl flex flex-row"
        // ref={formRef}
        role="form"
        aria-labelledby="chat-form-label"
        // onSubmit={handleSubmit}
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
        />
      </form>
    </div>
  );
}
export default ChatPage;

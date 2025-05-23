import { AIMessage } from "@/lib";
import ChatBubble from "./ChatBubble";
import ChatBubbleLoading from "./ChatBubbleLoading";

type Props = {
  messages: AIMessage[];
  isLoading: boolean;
};

function ChatList({ messages, isLoading }: Props) {
  return (
    <ul className="flex flex-col gap-5">
      {messages.map((message, idx) => (
        <li key={idx}>
          {message.role === "user" ? (
            <ChatBubble
              role={message.role}
              text={message.content}
              className="ml-auto border-none"
            />
          ) : (
            message?.display
          )}
        </li>
      ))}
      {isLoading ? (
        <li key={messages.length + 1}>
          <ChatBubbleLoading />
        </li>
      ) : null}
    </ul>
  );
}
export default ChatList;

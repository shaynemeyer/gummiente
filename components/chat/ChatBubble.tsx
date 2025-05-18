import { Card } from "../ui/card";
import { Brain } from "lucide-react";

type Props = {
  text: string;
  role?: string;
  className?: string;
  width?: string;
};

function ChatBubble({
  role = "assistant",
  text,
  className = "",
  width = "w-fit max-w-md",
}: Props) {
  return (
    <Card
      className={`p-5 flex flex-col gap-3 text-wrap break- border-none whitespace-pre-wrap ${width} ${className}`}
    >
      <h5 className="text-lg font-semibold">
        {role === "assistant" ? (
          <div>
            <Brain /> Gummi
          </div>
        ) : (
          `👤 ${role}`
        )}
      </h5>
      <p>{text}</p>
    </Card>
  );
}
export default ChatBubble;

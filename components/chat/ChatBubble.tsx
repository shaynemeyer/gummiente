import { ReactNode } from "react";
import { Card } from "../ui/card";
import { Brain, UserRound } from "lucide-react";
import AutoScroll from "../AutoScroll";

type Props = {
  text: string | ReactNode;
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
    <>
      <Card
        className={`p-5 flex flex-col gap-3 text-wrap break- border-none whitespace-pre-wrap ${width} ${className}`}
      >
        <h5 className="text-lg font-semibold">
          {role === "assistant" ? (
            <div className="flex flex-row gap-1 text-2xl text-center items-center">
              <Brain /> Gummi
            </div>
          ) : (
            <div className="flex flex-row gap-1 text-2xl text-center items-center">
              <UserRound /> {role}
            </div>
          )}
        </h5>
        <p>{text}</p> <AutoScroll trackVisibility />
      </Card>
    </>
  );
}
export default ChatBubble;

// import AutoScroll from "@/components/AutoScroll";

import { Card, CardContent } from "@/components/ui/card";
import { BotMessageSquare } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full max-w-4xl py-24 mx-auto stretch">
      {/* <AutoScroll trackVisibility /> */}
      Hello and welcome to Gummiente! What would you like to do today?
      <Card className="mt-2 max-w-[140px] text-center items-center">
        <CardContent className="flex flex-row gap-2">
          <BotMessageSquare /> Chat
        </CardContent>
      </Card>
      <Card className="mt-2 max-w-[140px] text-center items-center">
        <CardContent className="flex flex-row gap-2">
          <BotMessageSquare /> Chat
        </CardContent>
      </Card>
    </div>
  );
}

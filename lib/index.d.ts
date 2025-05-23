import { ReactNode } from "react";

// Used by lists and input fields
type ValueLabel = {
  value: string;
  label: string;
};

type AIMessage = {
  id?: string;
  role: "user" | "data" | "system" | "assistant";
  content: string;
  display?: ReactNode;
};

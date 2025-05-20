"use client";
import { KeyboardEvent, useRef } from "react";

function useEnterSubmit() {
  const formRef = useRef<null | HTMLFormElement>(null);
  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      formRef.current?.requestSubmit();
      event.preventDefault();
      console.log("submitting");
    }
  };

  return { formRef, onKeyDown: handleKeyDown };
}

export default useEnterSubmit;

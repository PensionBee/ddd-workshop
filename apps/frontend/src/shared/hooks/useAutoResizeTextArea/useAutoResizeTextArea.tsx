import { useEffect } from "react";

export const useAutoResizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value?: string
) => {
  useEffect(() => {
    if (!textAreaRef) return;
    textAreaRef.style.height = "0px";
    const scrollHeight = textAreaRef.scrollHeight;
    textAreaRef.style.height = scrollHeight + "px";
  }, [textAreaRef, value]);
};

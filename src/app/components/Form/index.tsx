"use client";

import { ChatCompletionRequestMessage } from "openai";

import { useAppContext } from "@/app/utils/context";

export default function Form() {
  const { setPrompt, messages, setMessages } = useAppContext();

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newPrompt =
          (e.currentTarget.elements.namedItem("prompt") as HTMLInputElement)
            ?.value || "";

        const newMessage: ChatCompletionRequestMessage = {
          role: "user",
          content: newPrompt,
        };

        setMessages([...messages, newMessage]);
        setPrompt(newPrompt);
      }}
    >
      <input type="text" name="prompt" defaultValue="" />
      <button type="submit">Submit</button>
    </form>
  );
}

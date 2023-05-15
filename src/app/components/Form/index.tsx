"use client";
import { ChatCompletionRequestMessage } from "openai";

import { useAppContext } from "@/app/utils/context";

export default function Form() {
  const { setPrompt, messages, setMessages } = useAppContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="prompt" defaultValue="" />
      <button type="submit">Submit</button>
    </form>
  );
}

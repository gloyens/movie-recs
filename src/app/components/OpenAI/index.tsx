"use client";

import { useEffect, useState } from "react";

import { ChatCompletionRequestMessage } from "openai";

import { useAppContext } from "@/app/utils/context";
import askOpenAI from "@/app/api/generateAnswer";

export default function OpenAI() {
  const { prompt, messages, setMessages } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  // Make request
  // Removing the useEffect will cause the component to re-render repeatedly
  // Careful with this one! Very easy to cause infinite loop
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await askOpenAI(messages);

      const newMessage: ChatCompletionRequestMessage = {
        role: "assistant",
        content: result,
      };

      setMessages([...messages, newMessage]);
      setIsLoading(false);
    };

    fetchData();
    console.log(messages);
  }, [prompt]);

  // Update messages array to include new response

  return (
    <div>
      {messages.map((message, index) => (
        <p key={index}>{message.content}</p>
      ))}
      {isLoading ? "Generating..." : ""}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

import { ChatCompletionRequestMessage } from "openai";

import { useAppContext } from "@/app/utils/context";
import askOpenAI from "@/app/api/generateAnswer";

export default function Responses() {
  const { prompt, messages, setMessages } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

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
  }, [prompt]);

  const displayedMessage = isLoading
    ? messages[messages.length - 2]?.content
    : messages[messages.length - 1]?.content;

  return (
    <div>
      {/* {messages.map((message, index) => (
        <p key={index}>{message.content}</p>
      ))} */}
      <p>{displayedMessage}</p>

      {isLoading ? prompt : ""}
    </div>
  );
}

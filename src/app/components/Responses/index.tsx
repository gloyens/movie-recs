"use client";

import { useEffect, useState } from "react";

import { ChatCompletionRequestMessage } from "openai";

import { useAppContext } from "@/app/utils/context";
import askOpenAI from "@/app/api/generateAnswer";

import Recommendations from "../Recommendations";
import Questions from "../Questions";

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

  const lastMessage = messages[messages.length - 1]?.content;
  // const regex = /{.*?}/im;
  // const messageJSON = lastMessage.match(regex)?.[0] || "";

  console.log(lastMessage);

  let messageObject;

  try {
    messageObject = JSON.parse(lastMessage);
  } catch (error) {
    // Parsing failed, use a default option
    console.error(error);
    messageObject = {
      question: "Parsing failed",
      answers: [],
    };
  }

  return (
    <div>
      {"question" in messageObject ? (
        <Questions messageObject={messageObject} />
      ) : (
        <Recommendations messageObject={messageObject} />
      )}

      {isLoading ? "Loading..." : ""}
    </div>
  );
}

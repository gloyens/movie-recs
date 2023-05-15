"use client";

import { Key, useEffect, useState } from "react";

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

  const lastMessage = isLoading
    ? messages[messages.length - 2]?.content
    : messages[messages.length - 1]?.content;

  console.log(lastMessage);

  let messageObject;

  try {
    messageObject = JSON.parse(lastMessage);
  } catch (error) {
    // Parsing failed, use a default option
    messageObject = {
      question: "Parsing failed",
      answers: [],
    };
  }

  return (
    <div>
      {"question" in messageObject ? (
        <>
          <h2>{messageObject["question"]}</h2>
          <ul>
            {messageObject["answers"].map(
              (answer: string, index: Key | null | undefined) => (
                <li key={index}>{answer}</li>
              )
            )}
          </ul>
        </>
      ) : (
        <ul>
          {messageObject["recommendations"].map(
            (
              recommendation: { title: string; description: string },
              index: Key | null | undefined
            ) => (
              <li key={index}>
                <h3>{recommendation.title}</h3>
                <p>{recommendation.description}</p>
              </li>
            )
          )}
        </ul>
      )}

      {isLoading ? "Loading..." : ""}
    </div>
  );
}

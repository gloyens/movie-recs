"use client";

import { useEffect, useState } from "react";

import { v4 as uuid } from "uuid";
import { GridLoader } from "react-spinners";
import { ChatCompletionRequestMessage } from "openai";

import { useAppContext } from "@/app/utils/context";
import askOpenAI from "@/app/api/generateAnswer";

import Recommendations from "../Recommendations";
import Questions from "../Questions";
import { Loading, Answers } from "./styles";

export default function Responses() {
  const { prompt, messages, setMessages, answers } = useAppContext();
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

  console.log(lastMessage);

  let messageObject;

  try {
    messageObject = JSON.parse(lastMessage);
  } catch (error) {
    // console.error(error);
    messageObject = {
      question: "Loading...",
      answers: [],
    };
  }

  return (
    <div>
      {"question" in messageObject ? (
        <Questions
          messageObject={messageObject}
          isLoading={isLoading}
          number={messages.length}
        />
      ) : (
        <Recommendations messageObject={messageObject} />
      )}

      {isLoading ? (
        <Loading>
          <GridLoader color={"#fff"} size={12} />
        </Loading>
      ) : (
        ""
      )}
      {"question" in messageObject ? (
        <Answers>
          {answers.map((answer) => (
            <li key={uuid()}>{answer}</li>
          ))}
        </Answers>
      ) : (
        ""
      )}
    </div>
  );
}

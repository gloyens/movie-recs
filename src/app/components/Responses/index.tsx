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
  const { prompt, messages, setMessages, answers, keyValue } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    const result = await askOpenAI(messages, keyValue);

    const newMessage: ChatCompletionRequestMessage = {
      role: "assistant",
      content: result,
    };

    setMessages([...messages, newMessage]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [prompt, keyValue]);

  const lastMessage =
    messages.length % 2 == 1
      ? messages[messages.length - 1]?.content
      : messages[messages.length - 2]?.content;

  console.log(lastMessage);

  let messageObject;

  try {
    messageObject = JSON.parse(lastMessage.match(/{.*}/ims)![0]);
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
          number={Math.floor((messages.length - 1) / 2) + 1}
        />
      ) : (
        <Recommendations messageObject={messageObject} />
      )}

      {isLoading && (
        <Loading>
          <GridLoader color={"#fff"} size={12} />
        </Loading>
      )}

      {"question" in messageObject && (
        <Answers>
          {answers.map((answer) => (
            <li key={uuid()}>{answer}</li>
          ))}
        </Answers>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

import { GridLoader } from "react-spinners";
import { ChatCompletionRequestMessage } from "openai";

import { useAppContext } from "@/app/utils/context";
import askOpenAI from "@/app/api/generateAnswer";

import Recommendations from "../Recommendations";
import Questions from "../Questions";
import { Loading } from "./styles";

export default function Responses() {
  const { prompt, messages, setMessages, keyValue } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const loadingTimer = useRef<null | ReturnType<typeof setTimeout>>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setLoadingText("");

    if (loadingTimer.current) {
      clearTimeout(loadingTimer.current);
    }

    loadingTimer.current = setTimeout(() => {
      setLoadingText("Waiting for OpenAI - this might take a little while!");
    }, 10000);

    const result = await askOpenAI(messages, keyValue);

    const newMessage: ChatCompletionRequestMessage = {
      role: "assistant",
      content: result,
    };

    setMessages([...messages, newMessage]);
    setIsLoading(false);
    setLoadingText("");
  };

  useEffect(() => {
    fetchData();
    return () => {
      if (loadingTimer.current) {
        clearTimeout(loadingTimer.current);
      }
    };
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
    if (lastMessage == undefined) {
      messageObject = {
        question: "Loading...",
        answers: [],
      };
    } else {
      console.error(error);
      messageObject = {
        question: "Something went wrong!",
        answers: [],
      };
    }
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
          <p>{loadingText}</p>
        </Loading>
      )}
    </div>
  );
}

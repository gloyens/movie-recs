"use client";

import { SetStateAction, createContext, useContext, useState } from "react";

import { ChatCompletionRequestMessage } from "openai";

interface ContextProps {
  prompt: string;
  setPrompt: (value: string) => void;
  messages: ChatCompletionRequestMessage[];
  setMessages: (value: ChatCompletionRequestMessage[]) => void;
  answers: string[];
  setAnswers: (value: SetStateAction<string[]>) => void;
}

const AppContext = createContext<ContextProps>({} as ContextProps);

const AppContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);

  return (
    <AppContext.Provider
      value={{
        prompt,
        setPrompt,
        messages,
        setMessages,
        answers,
        setAnswers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };

"use client";

import { createContext, useContext, useState } from "react";

import { ChatCompletionRequestMessage } from "openai";

interface ContextProps {
  prompt: string;
  setPrompt: (value: string) => void;
  messages: ChatCompletionRequestMessage[];
  setMessages: (value: ChatCompletionRequestMessage[]) => void;
}

const AppContext = createContext<ContextProps>({} as ContextProps);

const AppContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [prompt, setPrompt] = useState("How do you make a Waldorf salad?");
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

  return (
    <AppContext.Provider
      value={{
        prompt,
        setPrompt,
        messages,
        setMessages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };

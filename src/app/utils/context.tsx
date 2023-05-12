"use client";

import { createContext, useContext, useState } from "react";

interface ContextProps {
  prompt: string;
  setPrompt: (value: string) => void;
}

const AppContext = createContext<ContextProps>({} as ContextProps);

const AppContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [prompt, setPrompt] = useState("How do you make a Waldorf salad?");

  return (
    <AppContext.Provider
      value={{
        prompt,
        setPrompt,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export { AppContextProvider, useAppContext };

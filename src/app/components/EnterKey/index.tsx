"use client";

import { useState } from "react";

import { initializeOpenAI } from "@/app/utils/openai";
import { useAppContext } from "@/app/utils/context";

import { FormWrapper, FormContent, Input, Submit } from "./styles";

export default function EnterKey() {
  const [visible, setVisible] = useState(true);
  const { keyValue, setKeyValue } = useAppContext();
  const [inputContent, setInputContent] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputContent.length > 0) {
      setKeyValue(inputContent);
      initializeOpenAI(keyValue);
      setVisible(false);
    }
  };

  return (
    <FormWrapper visible={visible}>
      <h1>Movie&#8203;Bot</h1>
      <FormContent onSubmit={handleSubmit}>
        <p>Please enter your API key:</p>
        <Input
          type="password"
          onChange={(event) => setInputContent(event.target.value)}
        />
        <Submit type="submit">Submit</Submit>
      </FormContent>
    </FormWrapper>
  );
}

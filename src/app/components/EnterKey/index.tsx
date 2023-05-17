"use client";

import { useState } from "react";

import { initializeOpenAI } from "@/app/utils/openai";
import { useAppContext } from "@/app/utils/context";

import { FormWrapper, FormContent, Input, Submit } from "./styles";

export default function EnterKey() {
  const [visible, setVisible] = useState(true);
  // const [keyValue, setKeyValue] = useState("");
  const { keyValue, setKeyValue } = useAppContext();
  const [inputContent, setInputContent] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setKeyValue(inputContent);
    initializeOpenAI(keyValue);
    setVisible(false);
  };

  return (
    <FormWrapper visible={visible}>
      <FormContent onSubmit={handleSubmit}>
        <p>Please enter your API key:</p>
        <Input
          type="text"
          onChange={(event) => setInputContent(event.target.value)}
        />
        <Submit type="submit">Submit</Submit>
      </FormContent>
    </FormWrapper>
  );
}

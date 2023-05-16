"use client";

import { useState } from "react";
import { FormWrapper, FormContent, Input, Submit } from "./styles";
import { initializeOpenAI } from "@/app/utils/openai";

export default function EnterKey() {
  const [visible, setVisible] = useState(true);
  const [keyValue, setKeyValue] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    initializeOpenAI(keyValue)
    setVisible(false);
  };

  return (
    <FormWrapper visible={visible}>
      <FormContent onSubmit={handleSubmit}>
        <p>Please enter your API key:</p>
        <Input type="text" onChange={(event) => setKeyValue(event.target.value)} />
        <Submit type="submit">Submit</Submit>
      </FormContent>
    </FormWrapper>
  );
}

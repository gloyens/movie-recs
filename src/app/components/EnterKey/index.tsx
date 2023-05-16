"use client";

import { useState, useRef } from "react";
import { FormWrapper, FormContent, Input, Submit } from "./styles";

export default function EnterKey() {
  const [visible, setVisible] = useState(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setVisible(false);
  };

  return (
    <FormWrapper visible={visible}>
      <FormContent onSubmit={handleSubmit}>
        <p>Please enter your API key:</p>
        <Input type="text" />
        <Submit type="submit">Submit</Submit>
      </FormContent>
    </FormWrapper>
  );
}

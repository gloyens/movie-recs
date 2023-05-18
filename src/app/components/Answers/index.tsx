import { v4 as uuid } from "uuid";

import { useAppContext } from "@/app/utils/context";

import { AnswerWrapper } from "./styles";

export default function Answer() {
  const { answers } = useAppContext();

  return (
    <AnswerWrapper>
      {answers.map((answer) => (
        <li key={uuid()}>{answer}</li>
      ))}
    </AnswerWrapper>
  );
}

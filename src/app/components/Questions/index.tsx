import { v4 as uuid } from "uuid";

import { useAppContext } from "@/app/utils/context";

import { QuestionsWrapper, AnswersWrapper, Answer } from "./styles";

interface Props {
  messageObject: {
    question: string;
    answers: string[];
  };
}
// setPrompt onClick
export default function Questions({ messageObject }: Props) {
  const { setPrompt } = useAppContext();

  return (
    <QuestionsWrapper>
      <h2>{messageObject["question"]}</h2>
      <AnswersWrapper>
        {messageObject["answers"].map((answer: string) => (
          <li key={uuid()}>
            <Answer onClick={() => setPrompt(answer)}>{answer}</Answer>
          </li>
        ))}
      </AnswersWrapper>
    </QuestionsWrapper>
  );
}

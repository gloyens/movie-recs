import { v4 as uuid } from "uuid";

import { useAppContext } from "@/app/utils/context";

import {
  QuestionsWrapper,
  AnswersWrapper,
  AnswerWrapper,
  Answer,
} from "./styles";

interface Props {
  messageObject: {
    question: string;
    answers: string[];
  };
  isLoading: boolean;
}
// setPrompt onClick
export default function Questions({ messageObject, isLoading }: Props) {
  const { setPrompt } = useAppContext();

  return (
    <QuestionsWrapper>
      <h2>{messageObject["question"]}</h2>
      <AnswersWrapper>
        {messageObject["answers"].map((answer: string) => (
          <AnswerWrapper key={uuid()}>
            <Answer onClick={() => setPrompt(answer)} disabled={isLoading}>
              {answer}
            </Answer>
          </AnswerWrapper>
        ))}
      </AnswersWrapper>
    </QuestionsWrapper>
  );
}

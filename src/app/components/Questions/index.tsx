import { v4 as uuid } from "uuid";

import { useAppContext } from "@/app/utils/context";

import {
  QuestionsWrapper,
  AnswersWrapper,
  AnswerWrapper,
  Answer,
  Number,
} from "./styles";

interface Props {
  messageObject: {
    question: string;
    answers: string[];
  };
  isLoading: boolean;
  number: number;
}
// setPrompt onClick
export default function Questions({ messageObject, isLoading, number }: Props) {
  const { setPrompt, answers, setAnswers } = useAppContext();

  const handleClick = (answer: string) => {
    setPrompt(answer);
    setAnswers([...answers, answer]);
    console.log(answers);
  };

  return (
    <QuestionsWrapper>
      <h2>
        {number === 0 ? "" : <Number>{number}.</Number>}{" "}
        {messageObject["question"]}
      </h2>
      <AnswersWrapper>
        {messageObject["answers"].map((answer: string) => (
          <AnswerWrapper key={uuid()}>
            <Answer onClick={() => handleClick(answer)} disabled={isLoading}>
              {answer}
            </Answer>
          </AnswerWrapper>
        ))}
      </AnswersWrapper>
    </QuestionsWrapper>
  );
}

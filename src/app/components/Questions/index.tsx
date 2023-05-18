import { v4 as uuid } from "uuid";
import { ChatCompletionRequestMessage } from "openai";

import { useAppContext } from "@/app/utils/context";

import Answers from "../Answers";
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

export default function Questions({ messageObject, isLoading, number }: Props) {
  const { setPrompt, answers, setAnswers, messages, setMessages } =
    useAppContext();

  const handleClick = (answer: string) => {
    setPrompt(answer);

    const newMessage: ChatCompletionRequestMessage = {
      role: "user",
      content: answer,
    };

    setMessages([...messages, newMessage]);
    setAnswers([...answers, answer]);
  };

  return (
    <QuestionsWrapper>
      <Answers />
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

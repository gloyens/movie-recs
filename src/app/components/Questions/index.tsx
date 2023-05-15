import { uuid } from "uuidv4";

import { QuestionsWrapper } from "./styles";

interface Props {
  messageObject: {
    question: string;
    answers: string[];
  };
}

export default function Questions({ messageObject }: Props) {
  return (
    <QuestionsWrapper>
      <h2>{messageObject["question"]}</h2>
      <ul>
        {messageObject["answers"].map((answer: string) => (
          <li key={uuid()}>{answer}</li>
        ))}
      </ul>
    </QuestionsWrapper>
  );
}

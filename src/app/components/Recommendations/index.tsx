import { v4 as uuid } from "uuid";
import { ChatCompletionRequestMessage } from "openai";

import { useAppContext } from "@/app/utils/context";

import { RecommendationsWrapper, Recommendation, MoreButton } from "./styles";

interface Recommendation {
  title: string;
  description: string;
}

interface Props {
  messageObject: {
    recommendations: Recommendation[];
  };
}

export default function Recommendations({ messageObject }: Props) {
  const { setPrompt, messages, setMessages } = useAppContext();

  const handleClick = (request: string) => {
    setPrompt(request);

    const newMessage: ChatCompletionRequestMessage = {
      role: "user",
      content: request,
    };

    setMessages([...messages, newMessage]);
  };

  return (
    <RecommendationsWrapper>
      <ul>
        {messageObject["recommendations"].map(
          (recommendation: { title: string; description: string }) => (
            <Recommendation key={uuid()}>
              <h3>{recommendation.title}</h3>
              <p>{recommendation.description}</p>
            </Recommendation>
          )
        )}
      </ul>
      <MoreButton
        onClick={() =>
          handleClick(
            "Please offer five more similar recommendations in the same JSON format."
          )
        }
      >
        These are great. More please!
      </MoreButton>
    </RecommendationsWrapper>
  );
}

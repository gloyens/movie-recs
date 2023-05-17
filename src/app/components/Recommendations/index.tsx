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
        {messageObject.recommendations.map((recommendation) => (
          <a
            href={`https://duckduckgo.com/?q=!ducky+${encodeURIComponent(
              recommendation.title + " imdb"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            key={uuid()}
          >
            <Recommendation>
              <h3>{recommendation.title}</h3>
              <p>{recommendation.description}</p>
            </Recommendation>
          </a>
        ))}
        <MoreButton
          onClick={() =>
            handleClick(
              "Please offer five more similar recommendations in the same JSON format."
            )
          }
        >
          More please!
        </MoreButton>
      </ul>
    </RecommendationsWrapper>
  );
}

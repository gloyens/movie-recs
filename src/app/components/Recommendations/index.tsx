import { useEffect } from "react";

import { v4 as uuid } from "uuid";
import { ChatCompletionRequestMessage } from "openai";

import { useAppContext } from "@/app/utils/context";

import searchIMDb from "@/app/api/imdb";

import { RecommendationsWrapper, Recommendation, MoreButton } from "./styles";


interface Recommendation {
  title: string;
  description: string;
  link?: string;
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

  useEffect(() => {
    const updateRecommendations = async () => {
      const updatedRecommendations = await Promise.all(
        messageObject.recommendations.map(async (recommendation) => {
          const link = await searchIMDb(recommendation.title);
          return { ...recommendation, link };
        })
      );

      messageObject.recommendations = updatedRecommendations;
    };

    updateRecommendations();
  }, [messageObject]);

  return (
    <RecommendationsWrapper>
      <ul>
        {messageObject.recommendations.map((recommendation) => (
          <Recommendation key={uuid()}>
            <h3>{recommendation.title}</h3>
            <p>{recommendation.description}</p>
            {recommendation.link && (
              <a 
                href={recommendation.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Movie Link
              </a>
          )}
          </Recommendation>
        ))}
      </ul>
      <MoreButton
        onClick={() =>
          handleClick(
            "Please offer five more similar recommendations in the same JSON format."
          )
        }
      >
        More please!
      </MoreButton>
    </RecommendationsWrapper>
  );
}

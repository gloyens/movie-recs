import { useState, useEffect } from "react";

import { v4 as uuid } from "uuid";
import { ChatCompletionRequestMessage } from "openai";
import Image from "next/image";

import { useAppContext } from "@/app/utils/context";
import { config } from "@/app/utils/config";
import getMoviePoster from "@/app/api/tmdb";

import Answers from "../Answers";
import {
  RecommendationsWrapper,
  LinkWrapper,
  Recommendation,
  MoreButton,
  ImageWrapper,
  ContentWrapper,
} from "./styles";

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
  const [posters, setPosters] = useState<string[]>([]);

  useEffect(() => {
    const fetchPosters = async () => {
      const promises = messageObject.recommendations.map(
        async (recommendation) => {
          const poster = await getMoviePoster(recommendation.title);
          return poster || "";
        }
      );

      const results = await Promise.all(promises);
      setPosters(results);
    };

    fetchPosters();
  }, [messageObject.recommendations]);

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
      <h2>Check out these movies:</h2>
      <Answers />
      <ul>
        {messageObject.recommendations.map((recommendation, index) => {
          const poster = posters[index];

          return (
            <LinkWrapper
              href={`https://duckduckgo.com/?q=!ducky+${encodeURIComponent(
                recommendation.title + " imdb"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              key={uuid()}
            >
              <Recommendation>
                <ImageWrapper>
                  <Image
                    src={poster}
                    alt={`${recommendation.title} poster`}
                    fill
                  />
                </ImageWrapper>
                <ContentWrapper>
                  <h3>
                    {recommendation.title.match(/^(.*?)\s*\(\d{4}\)$/)?.[1]}
                  </h3>
                  <h4>{recommendation.title.match(/\((\d{4})\)/)?.[1]}</h4>
                  <p>{recommendation.description}</p>
                </ContentWrapper>
              </Recommendation>
            </LinkWrapper>
          );
        })}
        <MoreButton
          onClick={() =>
            handleClick(
              `Please offer ${config.recommendations} more similar recommendations in the same JSON format.`
            )
          }
        >
          More please!
        </MoreButton>
      </ul>
    </RecommendationsWrapper>
  );
}

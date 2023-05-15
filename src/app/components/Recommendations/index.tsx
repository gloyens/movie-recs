import { useEffect, useState } from "react";

import { v4 as uuid } from "uuid";

import searchIMDb from "@/app/api/imdb";

import { RecommendationsWrapper } from "./styles";

interface Recommendation {
  title: string;
  description: string;
}

interface Props {
  messageObject: {
    recommendations: Recommendation[];
  };
}

const Recommendations = ({ messageObject }: Props) => {
  const [links, setLinks] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const promises = messageObject.recommendations.map(
        async (recommendation: Recommendation, index) => {
          const response = await searchIMDb(recommendation.title);
          return (
            <a key={index} href={response.link}>
              {recommendation.title}
            </a>
          );
        }
      );
      const resolvedLinks = await Promise.all(promises);
      setLinks(resolvedLinks);
    };

    fetchLinks();
  }, [messageObject.recommendations]);

  return (
    <RecommendationsWrapper>
      <ul>
        {messageObject.recommendations.map(
          (recommendation: Recommendation, index: number) => (
            <li key={uuid()}>
              {links[index]}
              <h3>{recommendation.title}</h3>
              <p>{recommendation.description}</p>
            </li>
          )
        )}
      </ul>
    </RecommendationsWrapper>
  );
};

export default Recommendations;

import { v4 as uuid } from "uuid";

import { RecommendationsWrapper, Recommendation } from "./styles";

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
    </RecommendationsWrapper>
  );
}

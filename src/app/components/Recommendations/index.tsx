import { uuid } from "uuidv4";

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

export default function Recommendations({ messageObject }: Props) {
  return (
    <RecommendationsWrapper>
      <ul>
        {messageObject["recommendations"].map(
          (recommendation: { title: string; description: string }) => (
            <li key={uuid()}>
              <h3>{recommendation.title}</h3>
              <p>{recommendation.description}</p>
            </li>
          )
        )}
      </ul>
    </RecommendationsWrapper>
  );
}

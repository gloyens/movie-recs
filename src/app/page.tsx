import { Container } from "./styles";
import askOpenAI from "./api/generateAnswer";

export default function Home() {
  const prompt = "How do I make a waldorf salad?";

  return (
    <Container>
      <h1>Hello world</h1>
      <p>{askOpenAI(prompt)}</p>
    </Container>
  );
}

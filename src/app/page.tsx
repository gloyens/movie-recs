import { Container } from "./styles";
import askOpenAI from "./config";

export default function Home() {
  return (
    <Container>
      <h1>Hello world</h1>
      <p>{askOpenAI()}</p>
    </Container>
  );
}

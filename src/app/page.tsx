import { Container } from "./styles";
import OpenAI from "./components/OpenAI";
import Form from "./components/Form";

export default function Home() {
  return (
    <Container>
      <h1>Hello world</h1>
      <OpenAI />
      <Form />
    </Container>
  );
}

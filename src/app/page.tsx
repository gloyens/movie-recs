import { Container } from "./styles";
import Responses from "./components/Responses";
import Form from "./components/Form";

export default function Home() {
  return (
    <Container>
      <h1>Movie Recommendations</h1>
      <Responses />
      <Form />
    </Container>
  );
}

import { Container } from "./styles";
import Responses from "./components/Responses";

export default function Home() {
  return (
    <Container>
      <h1>Movie Recommendations</h1>
      <Responses />
    </Container>
  );
}

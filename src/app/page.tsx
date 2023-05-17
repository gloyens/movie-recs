import { Container } from "./styles";
import Responses from "./components/Responses";
import EnterKey from "./components/EnterKey";

export default function Home() {
  return (
    <>
      <EnterKey />
      <Container>
        <Responses />
      </Container>
    </>
  );
}

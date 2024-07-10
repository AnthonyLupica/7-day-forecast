import { Container } from "semantic-ui-react";
import './app.css'
import LocationSelect from "./components/LocationSelect";

const App = () => {
  return (
    <Container className="content-container">
      <LocationSelect />
    </Container>
  );
}

export default App

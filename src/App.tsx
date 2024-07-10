import { Container, Grid, Segment, Sidebar } from "semantic-ui-react";
import './app.css'
import WeekForecast from "./components/WeekForecast";

const App = () => {
  return (
    <>
      <Container className="content-container">
          <WeekForecast />
      </Container>
    </>
  );
}

export default App

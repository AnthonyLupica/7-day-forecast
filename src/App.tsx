import { Container } from 'semantic-ui-react';
import './app.css'
import LocationSelect from "./components/LocationSelect";
import ForecastDashboard from './components/ForecastDashboard';

const App = () => {
  return (
      <Container className="content-container">
          <LocationSelect />
          <ForecastDashboard />
      </Container>
  );
}

export default App

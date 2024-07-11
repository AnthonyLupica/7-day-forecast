import { Card } from "semantic-ui-react";
import { Weather } from "../models/weather";

const ForecastCard = ({ name, shortForecast, temperature, windSpeed} : Weather) => {
    return (
        <Card className="forecast-card" centered>
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Meta>{shortForecast}</Card.Meta>
                <Card.Description>
                    <p>{temperature}°</p>
                    <p>Wind speed of {windSpeed}</p>
                </Card.Description>
            </Card.Content>
        </Card>
    );
}

export default ForecastCard;
import { Card } from "semantic-ui-react";
import { Weather } from "../models/weather";

const ForecastCard = ({ 
    name, 
    detailedForecast, 
    temperature, 
    windSpeed,
    windDirection
} : Weather) => {
    return (
        <Card className="forecast-card" centered fluid>
            <Card.Content>
                <Card.Header>{name}</Card.Header>
                <Card.Description>
                    <h2>{temperature}°</h2>
                    <h5>Wind speed of {windSpeed} {windDirection}</h5>
                </Card.Description>

                <Card.Meta>{detailedForecast}</Card.Meta>
            </Card.Content>
        </Card>
    );
}

export default ForecastCard;
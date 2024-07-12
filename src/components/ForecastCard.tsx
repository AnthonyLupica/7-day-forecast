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
                    <p>{temperature}°</p>
                    <p>Wind speed of {windSpeed} {windDirection}</p>
                </Card.Description>

                <Card.Meta>{detailedForecast}</Card.Meta>
            </Card.Content>
        </Card>
    );
}

export default ForecastCard;
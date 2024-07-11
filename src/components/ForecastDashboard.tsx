import { observer } from "mobx-react-lite";
import { useStore } from "../context/context";
import { Card, Grid, SemanticWIDTHS } from "semantic-ui-react";
import { useEffect } from "react";
import { Weather } from "../models/weather";

const ForecastDashboard = () => {

    const { forecastStore } = useStore();
    const { location, forecast, forecastNow } = forecastStore;

    useEffect(() => {
        forecastStore.loadForecast();
    }, [forecastStore, location])

    return (
        <Grid className="forecast-container" centered>
            {forecast.length !== 0 && forecastNow ? (
                <>
                    <Grid.Row columns={1}>
                        <Grid.Column textAlign="center" width={5}>
                            <Card className="forecast">
                                <Card.Content classname="forecast-content">
                                    <Card.Header>{forecastNow.name}</Card.Header>
                                    <Card.Meta>{forecastNow.shortForecast}</Card.Meta>
                                    <Card.Description>
                                        <p>{forecastNow.temperature}°</p>
                                        <p>Wind speed of {forecastNow.windSpeed}</p>
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={forecast.length as SemanticWIDTHS}>
                        {forecast.map((el: Weather) => {
                            return (
                                <Grid.Column key={el.name} textAlign="center" stretched>
                                    <Card className="forecast">
                                        <Card.Content classname="forecast-content">
                                            <Card.Header>{el.name}</Card.Header>
                                            <Card.Meta>{el.shortForecast}</Card.Meta>
                                            <Card.Description>
                                                <p>{el.temperature}°</p>
                                                <p>Wind speed of {el.windSpeed}</p>
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            );
                        })}
                    </Grid.Row>
                </>
            ) : (
                <Grid.Row columns={1}>
                    <Grid.Column textAlign="center" className="placeholder">
                        <h1>Enter an address to see local forecast</h1>
                    </Grid.Column>
                </Grid.Row>
            )}
        </Grid>
    );
}

export default observer(ForecastDashboard);
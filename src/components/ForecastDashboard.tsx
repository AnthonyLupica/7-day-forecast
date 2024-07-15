import { observer } from "mobx-react-lite";
import { useStore } from "../context/context";
import { Grid, Header, Icon } from "semantic-ui-react";
import { useEffect } from "react";
import { Weather } from "../models/weather";
import ForecastCard from "./ForecastCard";

const ForecastDashboard = () => {

    const { forecastStore } = useStore();
    const { location, forecast } = forecastStore;

    useEffect(() => {
        forecastStore.loadForecast();
    }, [forecastStore, location])

    return (
        <Grid className="forecast-container">
            {forecast.ahead.length !== 0 && forecast.now ? (
                <>               
                    <Grid.Row>
                        <Grid.Column textAlign="center">
                            <Header style={{ color: "white" }}>
                                <Icon inverted name="location arrow" />
                                {location!.address}
                            </Header>
                            
                            <ForecastCard 
                                name={forecast.now.name} 
                                detailedForecast={forecast.now.detailedForecast}
                                temperature={forecast.now.temperature}
                                windSpeed={forecast.now.windSpeed}
                                windDirection={forecast.now.windDirection}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={3}>
                        {forecast.ahead.map((weatherItem: Weather) => {
                            return (
                                <Grid.Column key={weatherItem.name} textAlign="center" stretched>
                                    <ForecastCard 
                                        name={weatherItem.name} 
                                        detailedForecast={weatherItem.detailedForecast}
                                        temperature={weatherItem.temperature}
                                        windSpeed={weatherItem.windSpeed}
                                        windDirection={weatherItem.windDirection}
                                    />
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
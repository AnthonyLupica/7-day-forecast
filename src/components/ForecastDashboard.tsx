import { observer } from "mobx-react-lite";
import { useStore } from "../context/context";
import { Grid } from "semantic-ui-react";
import { useEffect } from "react";

const ForecastDashboard = () => {

    const { forecastStore } = useStore();
    const { location } = forecastStore;

    useEffect(() => {
        forecastStore.loadForecast();
    }, [forecastStore, location])

    return (
        <Grid>
            <Grid.Row columns={1} className="forecast-today">
                <Grid.Column>
                    <h1>Clear Skies</h1>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default observer(ForecastDashboard);
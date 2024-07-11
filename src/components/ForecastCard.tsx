import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";

const ForecastCard = () => {
    return (
        <Grid.Column textAlign="center">
            <h1>Clear Skies</h1>
        </Grid.Column>
    );
};

export default observer(ForecastCard);
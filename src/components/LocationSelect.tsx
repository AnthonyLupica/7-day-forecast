
import { observer } from "mobx-react-lite";
import { useStore } from "../context/context";
import { ChangeEvent, useState } from "react";
import { Button, Form, Grid } from "semantic-ui-react";

const LocationSelect = () => {
    const [address, setAddress] = useState<string>("");

    const { forecastStore } = useStore();
    const { setLocation, clearError, error } = forecastStore;

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.value.trim() === "") {
            clearError();
        }

       setAddress(e.target.value);
    };

    return (
        <Grid centered>
            <Grid.Column width={8}>
                <Form onSubmit={() => setLocation(address)} error={!error} >
                    <Form.Field>
                        <Form.Input
                            placeholder="Enter an address..."
                            value={address}
                            onChange={handleChange}
                            action={
                                <Button type="submit">Get Forecast</Button>
                            }
                            error={error && { 
                                content: error, 
                                pointing: 'below' 
                            }}
                            required={true}
                        />
                    </Form.Field>
                </Form>
            </Grid.Column>
        </Grid>
      );
};

export default observer(LocationSelect);
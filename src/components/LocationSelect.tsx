import { observer } from "mobx-react-lite";
import { useStore } from "../context/context";
import { ChangeEvent, useState } from "react";
import { Button, Form } from "semantic-ui-react";

const LocationSelect = () => {
    const [address, setAddress] = useState<string>("");

    const { forecastStore } = useStore();
    const { setSelectedLocation } = forecastStore;

    const handleSubmit = () => {
        
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
       setAddress(e.target.value);
    };

    return (
        <Form onSubmit={() => setSelectedLocation(address)}>
            <Form.Field>
                <Form.Input
                    placeholder="Enter an address..."
                    value={address}
                    onChange={handleChange}
                    action
                >
                    
                    <Button type="submit" floated="right">Submit</Button>
                </Form.Input>
            </Form.Field>
        </Form>
      );
};

export default observer(LocationSelect);
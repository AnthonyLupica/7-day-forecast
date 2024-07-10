import { Card, Grid } from "semantic-ui-react";

const WeekForecast = () => {
    // Dummy data for each day of the week
    const weekDays = [
      { day: 'Monday', weather: 'Sunny', temperature: '25°C' },
      { day: 'Tuesday', weather: 'Partly Cloudy', temperature: '22°C' },
      { day: 'Wednesday', weather: 'Rainy', temperature: '20°C' },
      { day: 'Thursday', weather: 'Cloudy', temperature: '21°C' },
      { day: 'Friday', weather: 'Thunderstorms', temperature: '23°C' },
      { day: 'Saturday', weather: 'Clear', temperature: '27°C' },
      { day: 'Sunday', weather: 'Foggy', temperature: '19°C' }
    ];
  
    return (
      <Grid centered columns={7}>
        {weekDays.map((day, index) => (
          <Grid.Column key={index}>
            <Card>
              <Card.Content>
                <Card.Header>{day.day}</Card.Header>
                <Card.Meta>{day.weather}</Card.Meta>
                <Card.Description>
                  Temperature: {day.temperature}
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        ))}
      </Grid>
    );
  };
  
  export default WeekForecast;
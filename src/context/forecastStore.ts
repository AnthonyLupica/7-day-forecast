import { makeAutoObservable, runInAction } from "mobx";
import { Location } from "../models/location";
import jsonp from "jsonp";
import axios from "axios";
import { Weather } from "../models/weather";

export default class ForecastStore {
    location: Location | undefined = undefined;
    forecast: Weather[] = [];
    forecastNow: Weather | undefined = undefined;
    error: string | undefined = undefined;
    
    constructor() {
        makeAutoObservable(this)
    }

    setLocation = (address: string) => {
        if (address === "") { 
            return; 
        }

        const geoCoderPrefix = 'https://geocoding.geo.census.gov/geocoder/locations/onelineaddress';
        const benchmark = '4'; 
        const format = 'json';

        const url = `${geoCoderPrefix}?address=${encodeURIComponent(address)}&benchmark=${benchmark}&format=${format}`;

         // Use jsonp to make the JSONP request
        jsonp(url, { timeout: 10000, name: 'jsonp' }, (err, data) => {
            if (err) {
                this.error = "An internal error was encountered"
                this.location = undefined;

                console.log(err.message);
            } else {
                // Extract latitude and longitude from the response
                const match = data.result.addressMatches[0];

                if (match?.coordinates) {
                    this.location = {
                        latitude: match.coordinates.y,
                        longitude: match.coordinates.x,
                        address: match.matchedAddress
                    };

                    this.error = undefined;
                } else {
                   this.location = undefined;
                   this.error = "No addresses could be matched"
                }
            }
        });
    };

    loadForecast = async () => {
        if (!this.location) {
            return;
        }
        
        const fetchFromURL = async (url: string) => {
            try {
                const res = await axios.get(url, {
                    headers: {
                        Accept: 'application/json',
                    },
                });     

                // Parse the forecast data and update state
                if (res.data.properties?.periods) {
                    const periods = res.data.properties.periods;

                    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                    const filteredForecast = periods.filter((period: Weather) => {
                        return daysOfWeek.includes(period.name);
                    });
                    
                    runInAction(() => {
                        this.forecastNow = {
                            name: periods[0].name,
                            detailedForecast: periods[0].detailedForecast,
                            temperature: periods[0].temperature,
                            windSpeed: periods[0].windSpeed,
                            windDirection: periods[0].windDirection
                        };
                        
                        this.forecast = [];
                        filteredForecast.forEach((period: Weather, index: number) => {
                            if (index < 6) { // limit to 6 days out
                                this.forecast.push({
                                    name: period.name,
                                    detailedForecast: period.detailedForecast,
                                    temperature: period.temperature,
                                    windSpeed: period.windSpeed,
                                    windDirection: period.windDirection
                                });
                            }
                        });
                    });
                }
            } catch (error) {
                console.error(error);
            }
        };

        try {
            const urlBase = 'https://api.weather.gov';
            const res = await axios.get(`${urlBase}/points/${this.location.latitude},${this.location.longitude}`, {
                headers: {
                    Accept: 'application/json'
                }
            });

            if (res.data.properties?.forecast) {
                const forecastUrl = res.data.properties.forecast;
                await fetchFromURL(forecastUrl);
            } 
        } catch (error) {
            console.log(error);
        }
    };

    clearError = () => {
        this.error = undefined;
    }
}

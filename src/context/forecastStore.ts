import { makeAutoObservable, runInAction } from "mobx";
import { Location } from "../models/location";
import jsonp from "jsonp";
import axios from "axios";
import { Weather } from "../models/weather";

interface Forecast {
    now: Weather | undefined;
    ahead: Weather[];
}

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const FORECAST_LIMIT = 6;

export default class ForecastStore {
    location: Location | undefined = undefined;

    forecast: Forecast = {
        now: undefined,
        ahead: []
    };

    loading: boolean = false;
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
                runInAction(() => {
                    this.error = "An internal error was encountered"
                    this.location = undefined;

                    this.forecast.now = undefined;
                    this.forecast.ahead = [];
                });

                console.error(err.message);
            } else {
                // Extract latitude and longitude from the response
                const match = data.result.addressMatches[0];

                if (match?.coordinates) {
                    runInAction(() => {
                        this.location = {
                            latitude: match.coordinates.y,
                            longitude: match.coordinates.x,
                            address: match.matchedAddress
                        };
    
                        this.error = undefined;
                    });
                } else {
                    runInAction(() => {
                        this.location = undefined;
                        this.error = "No addresses could be matched"

                        this.forecast.now = undefined;
                        this.forecast.ahead = [];
                    })
                }
            }
        });
    };

    loadForecast = async () => {
        if (!this.location) {
            return;
        }

        this.loading = true;        
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
                   
                    const filteredForecast = periods.filter((period: Weather) => DAYS_OF_WEEK
                        .includes(period.name))
                        .slice(0, FORECAST_LIMIT);
                
                    runInAction(() => {
                        this.forecast.now = {
                            name: periods[0].name,
                            detailedForecast: periods[0].detailedForecast,
                            temperature: periods[0].temperature,
                            windSpeed: periods[0].windSpeed,
                            windDirection: periods[0].windDirection
                        };
                        
                        this.forecast.ahead = filteredForecast.map((period: Weather) => ({                               
                            name: period.name,
                            detailedForecast: period.detailedForecast,
                            temperature: period.temperature,
                            windSpeed: period.windSpeed,
                            windDirection: period.windDirection                    
                        }));
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
            console.error(error);
        }
        finally {
            runInAction(() => this.loading = true);
        }
    };

    clearError = () => {
        this.error = undefined;
    }
}

import { makeAutoObservable } from "mobx";
import { Location } from "../models/location";
import jsonp from "jsonp";
import axios from "axios";
import { Weather } from "../models/weather";

export default class ForecastStore {
    location: Location | undefined = undefined;
    forecast: Weather[] = [];
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

                    console.log(this.location);
                    this.error = undefined;
                } else {
                   this.location = undefined;
                   this.error = "No addresses could be matched"
                }
            }
        });
    };

    loadForecast = async () => {
        const fetchFromURL = async (url: string) => {
            try {
                const res = await axios.get(url, {
                    headers: {
                        Accept: 'application/json',
                    },
                });     

                // Parse the forecast data and update state
                if (res.data.properties?.periods) {
                    const filteredForecast = res.data.properties?.periods.filter((period: Weather) => {
                        return period.name.trim().split(' ').length === 1; // Filter out days with more than one word
                    });

                    this.forecast = filteredForecast.map((period: Weather) => ({
                        name: period.name,
                        shortForecast: period.shortForecast,
                        temperature: period.temperature,
                        windSpeed: period.windSpeed
                    }));
                }

                console.log(this.forecast)
            } catch (error) {
                console.error(error);
            }
        };
        
        if (!this.location) {
            return;
        }

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

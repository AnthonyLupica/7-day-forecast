import { createContext, useContext } from "react";
import ForecastStore from "./forecastStore";

interface Context {
    forecastStore: ForecastStore
}

export const context: Context = {
    forecastStore: new ForecastStore()
}

export const ForecastContext = createContext(context);
export const useStore = () => useContext(ForecastContext);
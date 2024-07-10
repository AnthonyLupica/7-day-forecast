import { makeAutoObservable } from "mobx";
import { Location } from "../models/location";

export default class ForecastStore {
    selectedLocation: Location | undefined = undefined;

    setSelectedLocation = (address: string) => {

    };
    
    constructor() {
        makeAutoObservable(this)
    }
}

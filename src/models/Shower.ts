export class Shower {
    constructor(
       public _hotels: boolean = false,
       public _flights: boolean = false,
       public _travelPages: boolean = true,
       public _weathers: boolean = true,
       public _optionalTrips: boolean = true,
    ) {
    }

    get hotels(): boolean {
        return this._hotels;
    }

    set hotels(value: boolean) {
        this._hotels = value;
    }

    get flights(): boolean {
        return this._flights;
    }

    set flights(value: boolean) {
        this._flights = value;
    }

    get travelPages(): boolean {
        return this._travelPages;
    }

    set travelPages(value: boolean) {
        this._travelPages = value;
    }

    get weathers(): boolean {
        return this._weathers;
    }

    set weathers(value: boolean) {
        this._weathers = value;
    }

    get optionalTrips(): boolean {
        return this._optionalTrips;
    }

    set optionalTrips(value: boolean) {
        this._optionalTrips = value;
    }
}

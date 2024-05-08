export class LastMinuteInput {
    constructor(
        private from: string | null,
        private to: string | null,
        private fromAirport: null | string,
        private adults: null | number = null,
        private children: null | number = null,
        private hotelFoods: string[] = [],
        private hotelStars: null | number = null,
        private hotelRate: null | number = null,
        private rangeFrom: null | number = null,
        private rangeTo: null | number = null,
        private force: boolean = false
    ) {
    }

    toPayload(): object {
        return {
            from: this.from,
            to: this.to,
            fromAirport: this.fromAirport ? this.fromAirport.slice(0, 3) : null,
            adults: this.adults,
            children: this.children,
            hotelFoods: this.hotelFoods,
            hotelStars: this.hotelStars,
            hotelRate: this.hotelRate,
            rangeFrom: this.rangeFrom,
            rangeTo: this.rangeTo,
            force: this.force,
        };
    }
}

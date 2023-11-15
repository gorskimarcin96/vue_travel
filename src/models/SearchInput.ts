export class SearchInput {
    constructor(
        private nation: string,
        private place: string,
        private from: string | null,
        private to: string | null,
        private fromAirport: string,
        private toAirport: string,
        private adults: number,
        private children: number,
        private force: boolean
    ) {
    }

    toPayload(): object {
        return {
            nation: this.nation,
            place: this.place,
            from: this.from,
            to: this.to,
            fromAirport: this.fromAirport ? this.fromAirport.slice(0, 3) : null,
            toAirport: this.toAirport ? this.toAirport.slice(0, 3) : null,
            adults: this.adults,
            children: this.children,
            force: this.force,
        };
    }
}

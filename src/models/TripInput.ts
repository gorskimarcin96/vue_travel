export class TripInput {
    constructor(private search: number | null, private lastMinute: number | null, private source: string) {
    }

    toPayload(): object {
        return {
            search: this.search,
            lastMinute: this.lastMinute,
            source: this.source,
        };
    }
}

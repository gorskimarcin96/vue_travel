import type {SourceInterface} from "@/models/SourceInterface";
import type {Money} from "@/models/Money";

export class Flight implements SourceInterface {
    constructor(
        public readonly _id: string,
        public readonly _fromAirport: string,
        public readonly _fromStart: string,
        public readonly _fromEnd: string,
        public readonly _fromStops: string,
        public readonly _toAirport: string,
        public readonly _toStart: string,
        public readonly _toEnd: string,
        public readonly _toStops: string,
        public readonly _url: string,
        public readonly _money: Money,
        public readonly _source: string
    ) {
    }

    get id(): string {
        return this._id;
    }

    get fromAirport(): string {
        return this._fromAirport;
    }

    get fromStart(): string {
        return this._fromStart;
    }

    get fromEnd(): string {
        return this._fromEnd;
    }

    get fromStops(): string {
        return this._fromStops;
    }

    get toAirport(): string {
        return this._toAirport;
    }

    get toStart(): string {
        return this._toStart;
    }

    get toEnd(): string {
        return this._toEnd;
    }

    get toStops(): string {
        return this._toStops;
    }

    get url(): string {
        return this._url;
    }

    get money(): Money {
        return this._money;
    }

    get source(): string {
        return this._source;
    }
}

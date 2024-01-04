import type {SourceInterface} from "@/models/SourceInterface";

export class Weather implements SourceInterface {
    constructor(
        public readonly _id: number,
        public readonly _namePl: string,
        public readonly _date: string,
        public readonly _temperature2mMean: number,
        public readonly _precipitationHours: number,
        public readonly _precipitationSum: number,
        public readonly _source: string
    ) {
    }

    get id(): number {
        return this._id;
    }

    get namePl(): string {
        return this._namePl;
    }

    get date(): string {
        return this._date;
    }

    get temperature2mMean(): number {
        return this._temperature2mMean;
    }

    get precipitationHours(): number {
        return this._precipitationHours;
    }

    get precipitationSum(): number {
        return this._precipitationSum;
    }

    get source(): string {
        return this._source;
    }
}

import {Money} from "@/models/Money";

export class OptionalTrip {
    constructor(
        private readonly _id: number,
        private readonly _title: string,
        private readonly _description: string[],
        private readonly _url: string,
        private readonly _img: string,
        private readonly _source: string,
        private readonly _money: Money | null
    ) {
    }

    get id(): number {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get description(): string[] {
        return this._description;
    }

    get url(): string {
        return this._url;
    }

    get img(): string {
        return this._img;
    }

    get source(): string {
        return this._source;
    }

    get money(): Money | null {
        return this._money;
    }
}
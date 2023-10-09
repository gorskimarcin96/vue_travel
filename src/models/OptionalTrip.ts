import {Money} from "@/models/Money";
import type {SourceInterface} from "@/models/SourceInterface";

export class OptionalTrip implements SourceInterface {
    constructor(
        public readonly _id: number,
        public readonly _title: string,
        public readonly _description: string[],
        public readonly _url: string,
        public readonly _img: string,
        public readonly _source: string,
        public readonly _money: Money | null
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
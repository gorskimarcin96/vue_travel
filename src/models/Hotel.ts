import type {SourceInterface} from "@/models/SourceInterface";
import type {Money} from "@/models/Money";

export class Hotel implements SourceInterface {
    constructor(
        public readonly _id: number,
        public readonly _url: string,
        public readonly _title: string,
        public readonly _address: string,
        public readonly _descriptions: string[],
        public readonly _image: string,
        public readonly _rate: string,
        public readonly _money: Money,
        public readonly _source: string
    ) {
    }

    get id(): number {
        return this._id;
    }

    get url(): string {
        return this._url;
    }

    get title(): string {
        return this._title;
    }

    get address(): string {
        return this._address;
    }

    get descriptions(): string[] {
        return this._descriptions;
    }

    get image(): string {
        return this._image;
    }

    get rate(): string {
        return this._rate;
    }

    get money(): Money {
        return this._money;
    }

    get source(): string {
        return this._source;
    }
}

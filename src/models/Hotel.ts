import type {SourceInterface} from "@/models/SourceInterface";
import type {Money} from "@/models/Money";

export class Hotel implements SourceInterface {
    constructor(
        public readonly _id: number,
        public readonly _title: string,
        public readonly _url: string,
        public readonly _address: string | null,
        public readonly _descriptions: string[],
        public readonly _image: string,
        public readonly _stars: string,
        public readonly _rate: string,
        public readonly _food: string,
        public readonly _from: string,
        public readonly _to: string,
        public readonly _money: Money,
        public readonly _source: string
    ) {
    }

    get id(): number {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get url(): string {
        return this._url;
    }

    get address(): string | null {
        return this._address;
    }

    get descriptions(): string[] {
        return this._descriptions;
    }

    get image(): string {
        return this._image;
    }

    get stars(): string {
        return this._stars;
    }

    get rate(): string {
        return this._rate;
    }

    get food(): string {
        return this._food;
    }

    get from(): string {
        return this._from;
    }

    get to(): string {
        return this._to;
    }

    get money(): Money {
        return this._money;
    }

    get source(): string {
        return this._source;
    }
}

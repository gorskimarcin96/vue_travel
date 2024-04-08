import type {MoneyInterface} from "@/models/MoneyInterface";
import type {SourceInterface} from "@/models/SourceInterface";

export class OptionalTrip implements SourceInterface, MoneyInterface {
    constructor(
        public readonly _id: number,
        public readonly _title: string,
        public readonly _description: string[],
        public readonly _url: string,
        public readonly _image: string,
        public readonly _source: string,
        public readonly _price: number,
        public readonly _priceForOnePerson: boolean,
        public readonly _currency: string,
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

    get image(): string {
        return this._image;
    }

    get source(): string {
        return this._source;
    }

    get price(): number {
        return this._price;
    }

    get priceForOnePerson(): boolean {
        return this._priceForOnePerson;
    }

    get currency(): string {
        return this._currency;
    }
}
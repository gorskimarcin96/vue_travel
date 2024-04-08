import type {MoneyInterface} from "@/models/MoneyInterface";

export class Money implements MoneyInterface {

    constructor(public readonly _price: number, public readonly _priceForOnePerson: boolean, public readonly _currency: string) {
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
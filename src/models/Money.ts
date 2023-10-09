export class Money {
    constructor(public readonly _price: number, public readonly _currency: string) {
    }

    get price(): number {
        return this._price;
    }

    get currency(): string {
        return this._currency;
    }
}
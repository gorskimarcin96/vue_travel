export class Money {
    constructor(private readonly _price: number, private readonly _currency: string) {
    }

    get price(): number {
        return this._price;
    }

    get currency(): string {
        return this._currency;
    }
}
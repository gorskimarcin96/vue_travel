export interface MoneyInterface {
    get price(): number;

    get priceForOnePerson(): boolean;

    get currency(): string;
}

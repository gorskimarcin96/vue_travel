export class FlyCode {
    constructor(public readonly _code: string, public readonly _city: string, public readonly _nation: string) {
    }

    get code(): string {
        return this._code;
    }

    get city(): string {
        return this._city;
    }

    get nation(): string {
        return this._nation;
    }
}

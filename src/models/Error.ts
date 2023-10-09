export class Error {
    constructor(public readonly _service: string, public readonly _errors: string[]) {
    }

    get service(): string {
        return this._service;
    }

    get errors(): string[] {
        return this._errors;
    }
}

export class CountService {
    constructor(public readonly _service: string, public readonly _count: number) {
    }

    get service(): string {
        return this._service;
    }

    get count(): number {
        return this._count;
    }
}

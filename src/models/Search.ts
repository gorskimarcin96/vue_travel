import {Error} from "@/models/Error";
import type {CountService} from "@/models/CountService";

export class Search {
    constructor(
        private readonly _id: number,
        private readonly _nation: string,
        private readonly _place: string,
        private readonly _services: string[],
        private readonly _errors: Error[],
        private readonly _createdAt: string,
        private readonly _updatedAt: string,
        private readonly _finished: boolean,
        private readonly _countServices: CountService[]
    ) {
    }

    get id(): number {
        return this._id;
    }

    get nation(): string {
        return this._nation;
    }

    get place(): string {
        return this._place;
    }

    get services(): string[] {
        return this._services;
    }

    get errors(): Error[] {
        return this._errors;
    }

    get createdAt(): string {
        return this._createdAt;
    }

    get updatedAt(): string {
        return this._updatedAt;
    }

    get finished(): boolean {
        return this._finished;
    }

    get countServices(): CountService[] {
        return this._countServices;
    }
}
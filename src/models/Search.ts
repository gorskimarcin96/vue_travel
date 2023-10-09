import {Error} from "@/models/Error";

export class Search {
    constructor(
        private readonly _id: number,
        private readonly _services: string[],
        private readonly _errors: Error[],
        private readonly _createdAt: string,
        private readonly _updatedAt: string,
        private readonly _finished: boolean
    ) {
    }

    get id(): number {
        return this._id;
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
}
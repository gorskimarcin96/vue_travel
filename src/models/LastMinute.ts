import {Error} from "@/models/Error";
import type {CountService} from "@/models/CountService";
import type {SearchEntityInterface} from "@/models/SearchEntityInterface";

export class LastMinute implements SearchEntityInterface {
    constructor(
        public readonly _id: number,
        public readonly _from: string,
        public readonly _to: string,
        public readonly _adults: number,
        public readonly _children: number,
        public readonly _fromAirport: string,
        public readonly _services: string[],
        public readonly _errors: Error[],
        public readonly _createdAt: string,
        public readonly _updatedAt: string,
        public readonly _finished: boolean,
        public readonly _countServices: CountService[]
    ) {
    }

    get id(): number {
        return this._id;
    }

    get from(): string {
        return this._from;
    }

    get to(): string {
        return this._to;
    }

    get adults(): number {
        return this._adults;
    }

    get children(): number {
        return this._children;
    }

    get fromAirport(): string {
        return this._fromAirport;
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
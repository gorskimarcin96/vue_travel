import {TripArticle} from "@/models/PageArticle";
import type {SourceInterface} from "@/models/SourceInterface";

export class PageTrip implements SourceInterface {
    constructor(
        public readonly _id: number,
        public readonly _url: string,
        public readonly _map: string | null,
        public readonly _tripArticles: TripArticle[],
        public readonly _source: string
    ) {
    }

    get id(): number {
        return this._id;
    }

    get url(): string {
        return this._url;
    }

    get map(): string | null {
        return this._map;
    }

    get tripArticles(): TripArticle[] {
        return this._tripArticles;
    }

    get source(): string {
        return this._source;
    }
}
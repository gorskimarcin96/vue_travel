import {TripArticle} from "@/models/PageArticle";

export class PageTrip {
    constructor(
        private readonly _id: number,
        private readonly _url: string,
        private readonly _map: string | null,
        private readonly _tripArticles: TripArticle[],
        private readonly _source: string
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
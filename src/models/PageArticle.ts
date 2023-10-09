export class TripArticle {
    constructor(
        public readonly _id: number,
        public readonly _title: string,
        public readonly _descriptions: string[],
        public readonly _images: string[]
    ) {
    }

    get id(): number {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get descriptions(): string[] {
        return this._descriptions;
    }

    get images(): string[] {
        return this._images;
    }
}
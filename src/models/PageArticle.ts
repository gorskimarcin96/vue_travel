export class TripArticle {
    constructor(
        private readonly _id: number,
        private readonly _title: string,
        private readonly _descriptions: string[],
        private readonly _images: string[]
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
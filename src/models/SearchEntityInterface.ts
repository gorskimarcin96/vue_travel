import {Error} from "@/models/Error";
import type {CountService} from "@/models/CountService";

export interface SearchEntityInterface {
    get id(): number;

    get from(): string;

    get to(): string;

    get adults(): number;

    get children(): number;

    get fromAirport(): string;

    get services(): string[];

    get errors(): Error[];

    get createdAt(): string;

    get updatedAt(): string;

    get finished(): boolean;

    get countServices(): CountService[];
}

import {CountService} from "@/models/CountService";

export function fromObject(data: object): CountService[] {
    return Object.entries(data).map((row) => new CountService(row[0], row[1]));
}

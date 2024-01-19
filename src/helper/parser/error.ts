import {Error} from "@/models/Error";

export function fromObject(data: object): Error[] {
    return Object.entries(data).map( (row) =>  new Error(row[0], row[1]));
}

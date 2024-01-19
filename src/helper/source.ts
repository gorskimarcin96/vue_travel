import type {SourceInterface} from "@/models/SourceInterface";

export function uniqueSource(input: SourceInterface[]): string[] {
    return input.map((value) => value.source).filter(function (value, index, self): boolean {
        return self.indexOf(value) === index;
    });
}

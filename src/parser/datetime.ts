export function fromStringToDateTimeString(input: string): string {
    return `${input.split('T')[0]} ${input.split('T')[1].split('+')[0]}`;
}

export function fromString(input: string): string {
    return input.split('\\').pop() ?? '';
}

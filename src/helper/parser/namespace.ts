export function parseNamespace(input: string): string {
    return input.split('\\').pop() ?? '';
}

export function prefixFromNamespace(input: string): string {
    return input
        .replace("App\\Utils\\Crawler\\", "")
        .replace("App\\Utils\\Api\\", "")
        .replace("\\" + parseNamespace(input), "");
}

export function getAnchorLink(input: string): string {
    return `${prefixFromNamespace(input)}${parseNamespace(input)}`;
}

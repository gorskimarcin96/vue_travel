export function foodStringToTranslate(option: string) {
    return `main.${option.replaceAll(' ', '_').replaceAll(',', '')}`;
}

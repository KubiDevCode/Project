export type Mods = Record<string, boolean | string | undefined>

export function classNames(cls: string, mods: Mods = {}, additionals: Array<string | undefined> = []): string {
    return [
        cls,
        ...additionals.filter(Boolean),
        ...Object.entries(mods)
            .filter(([, value]) => value)
            .map(([className]) => className),
    ]
        .join(' ')
}

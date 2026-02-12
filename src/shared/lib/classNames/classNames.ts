type Mods = Record<string, boolean | string>

// eslint-disable-next-line max-len
export function classNames(cls: string, mods: Mods = {}, additionals: string[] = []): string {
    return [
        cls,
        ...additionals.filter(Boolean),
        ...Object.entries(mods)
            .filter(([, value]) => value)
            .map(([className]) => className),
    ]
        .join(' ')
}

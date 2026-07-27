export function getQueryParams(params: OptionalRecord<string, string>) {
    const searchParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([name, value]) => {
        if (value !== undefined) {
            searchParams.set(name, value);
        }
    });
    return `?${searchParams.toString()}`;
}

/**
 * Р¤СѓРЅРєС†РёСЏ РґРѕР±Р°РІР»РµРЅРёСЏ РїР°СЂР°РјРµС‚СЂРѕРІ СЃС‚СЂРѕРєРё Р·Р°РїСЂРѕСЃР° РІ URL
 * @param params
 */
export function addQueryParams(params: OptionalRecord<string, string>) {
    window.history.pushState(null, '', getQueryParams(params));
}

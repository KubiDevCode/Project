/* eslint-disable*/
import { test, expect } from '@playwright/test';
// @ts-ignore
async function getStoryIdsFromPreview(page): Promise<string[]> {
    // Открываем iframe без конкретной story, чтобы загрузился стор
    await page.goto('/iframe.html', { waitUntil: 'networkidle' });

    // Ждём пока Storybook preview инициализируется
    await page.waitForFunction(() => {
        const w = window as any;
        return Boolean(
            (w.__STORYBOOK_CLIENT_API__ && typeof w.__STORYBOOK_CLIENT_API__.raw === 'function') ||
            (w.__STORYBOOK_STORY_STORE__ && typeof w.__STORYBOOK_STORY_STORE__.extract === 'function')
        );
    });

    const ids: string[] = await page.evaluate(() => {
        const w = window as any;

        // SB6: чаще всего есть CLIENT_API.raw()
        if (w.__STORYBOOK_CLIENT_API__?.raw) {
            const stories = w.__STORYBOOK_CLIENT_API__.raw();
            return stories
                .filter((s: any) => s && s.id && s.kind) // выкидываем мусор
                .map((s: any) => s.id);
        }

        // fallback: STORY_STORE.extract()
        if (w.__STORYBOOK_STORY_STORE__?.extract) {
            const extracted = w.__STORYBOOK_STORY_STORE__.extract();
            return Object.keys(extracted || {});
        }

        return [];
    });

    // На всякий: уникализируем
    return Array.from(new Set(ids));
}

test('storybook visual regression', async ({ page }) => {
    const storyIds = await getStoryIdsFromPreview(page);

    if (!storyIds.length) {
        throw new Error('Не нашёл ни одной story в preview. Проверь, что storybook-static реально открывается.');
    }

    for (const id of storyIds) {
        await page.goto(`/iframe.html?id=${id}`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(100);

        await expect(page).toHaveScreenshot(`${id}.png`, { fullPage: true });
    }
});
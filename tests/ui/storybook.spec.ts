/* eslint-disable*/
import { test, expect } from '@playwright/test';

// @ts-ignore
async function getStoryIdsFromPreview(page): Promise<string[]> {
    await page.goto('/iframe.html', { waitUntil: 'networkidle' });

    await page.waitForFunction(() => {
        const w = window as any;
        return Boolean(
            (w.__STORYBOOK_CLIENT_API__ && typeof w.__STORYBOOK_CLIENT_API__.raw === 'function') ||
            (w.__STORYBOOK_STORY_STORE__ && typeof w.__STORYBOOK_STORY_STORE__.extract === 'function')
        );
    });

    const ids: string[] = await page.evaluate(() => {
        const w = window as any;

        if (w.__STORYBOOK_CLIENT_API__?.raw) {
            const stories = w.__STORYBOOK_CLIENT_API__.raw();
            return stories
                .filter((s: any) => s && s.id)
                .map((s: any) => s.id);
        }

        if (w.__STORYBOOK_STORY_STORE__?.extract) {
            const extracted = w.__STORYBOOK_STORY_STORE__.extract();
            return Object.keys(extracted || {});
        }

        return [];
    });

    return Array.from(new Set(ids));
}

test('storybook visual regression', async ({ page }) => {
    const storyIds = await getStoryIdsFromPreview(page);

    if (!storyIds.length) {
        throw new Error('Не нашёл ни одной story в preview. Проверь, что storybook открывается и доступен /iframe.html');
    }

    console.log(`Found ${storyIds.length} stories`);

    const errors: string[] = [];

    for (let i = 0; i < storyIds.length; i++) {
        const id = storyIds[i];
        console.log(`[${i + 1}/${storyIds.length}] ${id}`);

        try {
            await page.goto(`/iframe.html?id=${id}`, { waitUntil: 'networkidle' });

            // Можно чуть стабильнее: дождаться что iframe реально отрендерил story
            // (часто достаточно body visible)
            await page.locator('body').waitFor({ state: 'visible', timeout: 10_000 });

            // маленькая пауза для шрифтов/лейаута
            await page.waitForTimeout(100);

            await expect(page).toHaveScreenshot(`${id}.png`, { fullPage: true });
        } catch (e: any) {
            // сохраняем, но не падаем сразу
            const msg = e?.message ? String(e.message) : String(e);
            errors.push(`❌ ${id}\n${msg}`);
        }
    }

    if (errors.length) {
        // чтобы сообщение не было гигантским — можно обрезать
        const head = errors.slice(0, 20).join('\n\n');
        const tailNote = errors.length > 20 ? `\n\n...and ${errors.length - 20} more` : '';
        throw new Error(`Visual diffs/errors: ${errors.length}\n\n${head}${tailNote}`);
    }
});
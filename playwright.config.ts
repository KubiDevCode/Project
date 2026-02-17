import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests/ui',
    timeout: 60_000,
    expect: { timeout: 15_000 },
    use: {
        baseURL: 'http://127.0.0.1:6006',
        viewport: { width: 1366, height: 768 },
        // полезно для стабильности:
        // @ts-ignore
        animations: 'disabled',
    },
    snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',
    retries: 0,
});

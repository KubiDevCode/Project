import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
    const isDev = mode === 'development';

    return {
        plugins: [svgr({ exportAsDefault: true }), react()],
        resolve: {
            alias: [{ find: '@', replacement: '/src' }],
        },
        define: {
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(
                process.env.VITE_API_URL ||
                    (isDev ? 'http://localhost:8000' : '/api'),
            ),
            __PROJECT__: JSON.stringify('frontend'),
        },
    };
});

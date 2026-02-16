module.exports = {
    stories: ['../../src/**/*.stories.@(ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
    framework: '@storybook/react',
    core: { builder: 'webpack5' },

    webpackFinal: async (config) => {
        // чтобы import/export нормально парсились
        config.module.rules.push({
            test: /\.[jt]sx?$/,
            type: 'javascript/auto',
        });

        return config;
    },
}

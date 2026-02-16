import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export function buildCssLoaders(isDev: boolean) {
    return {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: (resPath: string) => Boolean(resPath.includes('.module.')),
                        // eslint-disable-next-line max-len
                        localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:5]',
                        namedExport: false,
                        exportLocalsConvention: 'asIs',
                    },
                },
            },
            'sass-loader',
        ],
    }
}

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rxPaths = require('rxjs/_esm5/path-mapping');
const MergeJsonWebpackPlugin = require("merge-jsons-webpack-plugin");

const helpers = require('./helpers');

module.exports = (options) => ({
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [
            'node_modules'
        ],
        alias: {
            app: helpers.root('src/app/'),
            ...rxPaths()
        }
    },
    stats: {
        children: false
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: true,
                    caseSensitive: true,
                    removeAttributeQuotes: false,
                    minifyJS: false,
                    minifyCSS: false
                },
                exclude: ['./src/index.html']
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot|ico)$/,
                loaders: ['file-loader?hash=sha512&digest=hex&name=assets/[hash].[ext]']
            },
            // Ignore warnings about System.import in Angular
            { test: /[\/\\]@angular[\/\\].+\.js$/, parser: { system: true } },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `'${options.env}'`,
                BUILD_TIMESTAMP: `'${new Date().getTime()}'`,
                VERSION: `'${helpers.parseVersion()}'`,
                DEBUG_INFO_ENABLED: options.env === 'development',
            }
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new MergeJsonWebpackPlugin({
            output: {
                groupBy: [
                    { pattern: "./src/assets/i18n/en.json", fileName: "./assets/i18n/en.json" },
                    { pattern: "./src/assets/i18n/vn.json", fileName: "./assets/i18n/vn.json" },
                ]
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['vendors', 'polyfills', 'global', 'main'],
            chunksSortMode: 'manual',
            inject: 'body',
            favicon: './src/favicon.ico'
        })
    ]
});
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // Extract text from a bundle, or bundles, into a separate file
const MomentLocalesPlugin = require('moment-locales-webpack-plugin'); //Easily remove unused Moment.js locales when building with webpack
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;

const commonConfig = require('./webpack.config.common.js');
const helpers = require('./helpers');

const ENV = 'production';

// Create multiple instances
const extractSASS = new ExtractTextPlugin(`content/[name]-sass.[hash].css`);
const extractCSS = new ExtractTextPlugin(`content/[name].[hash].css`);

module.exports = webpackMerge((commonConfig({env : ENV})), {
    entry: {
        polyfills: './src/polyfills',
        global: './src/assets/styles/global.scss',
        main: './src/main'
    },
    output: {
        path: helpers.root('dist'),
        filename: 'app/[name].[hash].bundle.js',
        chunkFilename: 'app/[id].[hash].chunk.js'
    },
    module: {
        rules: [
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/, //Angular Ahead-of-Time Webpack Plugin, Ahead-of-Time (AOT), which compiles your app at build time
                loader: '@ngtools/webpack'
            },
            {
                test: /\.scss$/,
                loaders: ['to-string-loader', 'css-loader', 'sass-loader'],
                exclude: /(vendor\.scss|global\.scss)/
            },
            {
                test: /(vendor\.scss|global\.scss)/,
                use: extractSASS.extract({
                    fallback: 'style-loader', //loader(e.g 'style-loader') that should be used when the CSS is not extracted (i.e. in an additional chunk when allChunks: false)
                    use: ['css-loader', 'postcss-loader', 'sass-loader'], //Loader(s) that should be used for converting the resource to a CSS exporting module (required)
                    publicPath: '../' //Override the publicPath setting for this loader
                })
            },
            {
                test: /\.css$/,
                loaders: ['to-string-loader', 'css-loader'],
                exclude: /(vendor\.css|global\.css)/
            },
            {
                test: /(vendor\.css|global\.css)/,
                use: extractCSS.extract({
                    fallback: 'style-loader',
                    use: ['css-loader'],
                    publicPath: '../'
                })
            }
        ]
    },
    optimization: {
        runtimeChunk: false, // Each entry chunk embeds runtime.,
        splitChunks: { // Create a vendors chunk, which includes all code from node_modules in the whole application.
            cacheGroups: {
              commons: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all'
              }
            }
        }
    },
    plugins: [
        extractSASS,
        extractCSS,
        new MomentLocalesPlugin({
            localesToKeep: [
                'en',
                'vi'
            ] //An array of locales to keep bundled (other locales would be removed).
        }),
        new AngularCompilerPlugin({
            mainPath: helpers.root('src/main.ts'), // Optional if entryModule is specified. The main.ts file containing the bootstrap code. The plugin will use AST to determine the entryModule.
            tsConfigPath: helpers.root('tsconfig-aot.json'), //The path to the tsconfig.json file. This is required. In your tsconfig.json, you can pass options to the Angular Compiler with angularCompilerOptions.
            sourceMap: true // Optional. Include sourcemaps.
        }),
        new webpack.LoaderOptionsPlugin({ // that it is built for migration from webpack
            minimize: true, // Where loaders can be switched to minimize mode.
            debug: false // Whether loaders should be in debug mode or not.
        }),
    ],
    mode: 'production'
});
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const writeFilePlugin = require('write-file-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const path = require('path');

const commonConfig = require('./webpack.config.common.js');
const helpers = require('./helpers');

const ENV = 'development';

module.exports = (options) => webpackMerge(commonConfig({ env: ENV }), {
    devtool: 'eval-source-map',
    devServer: {
        historyApiFallback: true,
        stats: options.stats,
        watchOptions: {
            ignored: /node_modules/
        }
    },
    entry: {
        polyfills: './src/polyfills',
        global: './src/assets/styles/global.scss',
        main: './src/main'
    },  
    output: {
        path: helpers.root('dist'),
        filename: 'app/[name].bundle.js',
        chunkFilename: 'app/[id].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                   { loader: 'angular2-template-loader' },
                   {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            happyPackMode: true
                        }
                    },
                    { loader: 'angular-router-loader' }
                ],
                exclude: ['node_modules']
            },
            {
                test: /\.scss$/,
                loaders: ['to-string-loader', 'css-loader', 'sass-loader'],
                exclude: /(vendor\.scss|global\.scss)/
            }, 
            {
                test: /(vendor\.scss|global\.scss)/,
                loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },       
            {
                test: /\.css$/,
                loaders: ['to-string-loader', 'css-loader'],
                exclude: /(vendor\.css|global\.css)/
            },    
            {
                test: /(vendor\.css|global\.css)/,
                loaders: ['style-loader', 'css-loader']
            }
        ],
        
    },
    stats: options.stats,
    plugins: [
        new SimpleProgressWebpackPlugin({
            format: options.stats === 'minimal' ? 'compact' : 'expanded'
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 4000,
            // proxy the Webpack Dev Server endpoint
            // (which should be serving on http://localhost:9060/)
            // through BrowserSync
            proxy: {
                target: 'http://localhost:9060'
            }
        }, {
            // prevent BrowserSync from reloading the page
            // and let Webpack Dev Server take care of this
            reload: false
        }),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)/,
            path.resolve(__dirname, './src')
        ),
        new writeFilePlugin()
    ],
    mode: 'development'
});

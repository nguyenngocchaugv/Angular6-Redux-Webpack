const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');
const path = require('path');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
    devtool: 'eval-source-map',
    devServer: {
        port: 4000,
        open: true,
        historyApiFallback: true,
        stats: 'minimal'
    },
    entry: {
        polyfills: './src/polyfills',
        main: './src/main'
    },  
    output: {
        path: helpers.root('dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
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
                test: /\.css$/,
                loaders: ['to-string-loader', 'css-loader'],
                exclude: /(vendor\.css|global\.css)/
            },    
        ],
        
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)/,
            path.resolve(__dirname, './src')
        ),
    ],
    mode: 'development'
});

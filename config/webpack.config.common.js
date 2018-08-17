const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const helpers = require('./helpers');

module.exports = {
    entry: {
        main : './src/main.ts'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
          {
            test: /\.html$/,
            loader: 'html-loader',
            options: {
                minimize: true,
                caseSensitive: true,
                removeAttributeQuotes:false,
                minifyJS:false,
                minifyCSS:false
            },
            exclude: ['./src/index.html']
        },
          {
            test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
            loader: 'file-loader?name=assets/[name].[hash].[ext]'
          },
        //   {
        //     test: /\.css$/,
        //     loaders: 'style-loader!css-loader'
        //   },
          // Ignore warnings about System.import in Angular
          { test: /[\/\\]@angular[\/\\].+\.js$/, parser: { system: true } }, 
        ]
      },
      plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['vendors', 'polyfills', 'global', 'main'],
            chunksSortMode: 'manual',
            inject: 'body'
        })
      ]
};
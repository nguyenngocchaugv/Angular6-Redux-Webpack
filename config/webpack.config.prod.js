const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const SRC_PATH = '../src/app/';

//khai báo các thư viện bỏ vào vendor.js, được cache trên browser 
const VENDOR_LIBS = [
    'lodash',
    'jquery'
];

const devServer = {
    port: 4000,
    open: true
}
//hash is calculated for a build - of webpack
//chunkhash is calculated for chunk (entry file) - of webpack
//contenthash is special hash generated in ExtractTextPlugin and is calculated by extracted content

const config = {
    //entry: path.resolve(__dirname, SRC_PATH + 'index.js'), // điểm bắt đầu
    target: 'web',
    entry: {
        bundle: path.resolve(__dirname, SRC_PATH + 'index.js'),
        vendor: VENDOR_LIBS
    },
    output: {
        filename: '[name].[chunkhash].js', //name='main' . if use vendor name = bundle || vendor
        path: path.resolve(__dirname, '../dist')
    },
    module: {
        rules: [
            {
                use: 'babel-loader', // sử dụng babel-loader 
                test: /\.jssd$/, // nhưng file có kết thúc js, $ đại diện cho kết thúc, 
                //quy tắc này được viết trong / /
                //x?y => lấy y thay x, trong trường hợp này là lấy empty thay cho x tức
                exclude: /node_modules/
            },
            {
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: "style-loader"
                }),
                test: /(\.css|\.scss)$/
            },
            {
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images', // tạo thư mục images trong dist
                            name: '[hash].[ext]'
                        }
                    }
                ],
                test: /.\jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.eot$|\.ttf$/
            }
        ]
    },
    plugins: [
        //webpack V1 : mỗi lần build chuỗi hash sẽ khác nhau nên phải dùng thêm WebpackMd5Hash : thay đổi nội dung thì hash mới thay đổi
        //new WebpackMd5Hash(), 
        //webpack V>1 , cơ chế này đã tích hợp 
        new ExtractTextPlugin({
            filename: "[name].[contenthash].css" // ExtractTextPlugin tạo file css nằm ngoài bundle.js, contenthash: sử dụng riêng cho ExtractTextPlugin
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, SRC_PATH + 'index.html'), //tạo file index.html trong output config (dist) và import bundle, css tự động
            filename: 'index.html',
            minify: {
                removeComments: true, //xóa comment
                collapseWhitespace: true, // gôm thành 1 dòng
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
            //with webpack 3.10.0 thì nó cache lại thay đổi, nếu như không có gì thay đổi thì chuỗi chunkhash không đổi
            //xóa thư mục dist cũng không sao vì đã cache
            //với webpack cũ thì cần minifest làm chuyện này
            //name: ['vendor','minifest']
        }),
        //new webpack.optimize.UglifyJsPlugin({ output: { comments: false } }), //minify , mã hóa file bundle cho gọn nhẹ-không sử dụng khi webpack-dev-server
        // Eliminate duplicate packages when generating bundle
        new webpack.optimize.DedupePlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            // _map: ['lodash', 'map']
        }),
        new CompressionPlugin({ //nén thánh file gz
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$/,
            threshold: 10240, //Những file lớn hơn 12240 bytes thì mới nén
            minRatio: 0.8 //???
        }),
        //
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
}

module.exports = config;

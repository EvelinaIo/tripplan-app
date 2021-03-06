const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    output: {
        libraryTarget: 'var',
        library: 'Client',
        /* With zero configuration, clean-webpack-plugin will remove files inside the directory below */
        path: path.resolve(process.cwd(), 'dist')
    },
    devtool: 'source-map',
    stats: 'verbose',
    module: {
        rules: [
            {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
            },
            {
            test: /\.(png|svg|jpe?g|gif)$/i,
            loader: "file-loader",
            options: {
                name: '[name].[ext]',
                outputPath: 'media'
            }
            },
            {
            test: /\.scss$/,
            use: [ "style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin ({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ]  
}
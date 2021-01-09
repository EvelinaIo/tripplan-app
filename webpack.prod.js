const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    output:{
         libraryTarget: 'var',
         library: 'Client',
         /* With zero configuration, clean-webpack-plugin will remove files inside the directory below */
         path: path.resolve(process.cwd(), 'dist'),
       },
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
                use: [ MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
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
        }),
        new MiniCssExtractPlugin({ filename: "[name].css" }),
        new WorkboxPlugin.GenerateSW({})
    ],
    optimization: {
        minimizer: [new TerserPlugin({}), new CssMinimizerPlugin()],
        },
}
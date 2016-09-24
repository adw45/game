var Webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'app', 'main.js');

var config = {
    devtool: "eval",
    entry: [
        // For hot style updates
        'webpack/hot/dev-server',
        // The script refreshing the browser on none hot updates
        'webpack-dev-server/client?http://localhost:8080',
        mainPath    
    ],
    output: {
        path: buildPath,
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.tmx$/,
                loader: 'style!tmx'
            }
        ]
    },
    plugins: [new Webpack.HotModuleReplacementPlugin()]
}

module.exports = config;

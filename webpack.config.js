'use strict';

var path = require('path');
// var UglifyJsPlugin = require("./node_modules/webpack/lib/optimize/UglifyJsPlugin");

module.exports = {
    entry: {
        dev: [
            'webpack/hot/only-dev-server',
            // 'webpack-dev-server/client?http://localhost:4188',
            path.resolve(__dirname, 'static/index.js')
        ],
        dist: [
            path.resolve(__dirname, 'static/index.js')
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        // filename: '[name].bundle.js',
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            loader: 'babel-loader',
            exclude: ['*.py', '*.pyc', 'templates'],
            query: {
                presets: ['react','es2015']
            }
        }, {
            test: /\.css$/, // Only .css files
            loader: 'style!css' // Run both loaders
        },{
            test: /\.html$/,
            loader: 'raw'
        }]
    },
    resolve: {
        alias: {
          dynamicRequire: 'dynamic_require'
        },
        root: [path.resolve(__dirname, './static/component')]
      },
    // plugins: [
    //  //使用丑化js插件
    //  new UglifyJsPlugin({
    //      compress: {
    //          warnings: false
    //      },
    //      mangle: {
    //          except: ['window', '$']
    //      }
    //  })
    // ],
    node: {
        fs: "empty"
    }
};

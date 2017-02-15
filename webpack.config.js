'use strict';
var path = require('path');

module.exports = {
    entry: {
        dev: [
            'webpack/hot/only-dev-server',
            path.resolve(__dirname, 'static/index.js')
        ],
        dist: [
            path.resolve(__dirname, 'static/index.js')
        ]
    },

    output: {
        path: path.resolve(__dirname, 'static/build'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: ['*.py', '*.pyc', 'templates']
        }, {
            test: /\.css$/, // Only .css files
            loader: 'style!css' // Run both loaders
        },{
            test: /\.html$/,
            loader: 'raw'
        }]
    },

    resolve: {
        extensions: ['', '.web.js', '.js', '.json'],
        alias: {
          dynamicRequire: 'dynamic_require'
        },
        root: [path.resolve(__dirname, './static/component')]
    },

    node: {
        fs: "empty"
    }
};

const merge = require('webpack-merge');

const config = require('./webpack.config.js');

module.exports = merge(config, {
    mode: 'development',
    devServer: {
        contentBase: __dirname + "/build",
        compress: false,
        port: 8080,
    },
});


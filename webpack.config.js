const path = require("path"),
WriteFilePlugin = require("write-file-webpack-plugin");

module.exports = {
    entry: './sources/index.js',
    devServer: {
        outputPath: path.join(__dirname, './production')
    },
    output: {
        path: path.resolve(__dirname, 'production'),
        filename: 'test.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    stats: {
        colors: true
    },

    plugins: [
        new WriteFilePlugin
    ],

    mode: 'production',
    devtool: 'source-map'
};


import webpack from 'webpack';
import Config from 'webpack-config';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

export default new Config().extend('conf/webpack.base.config.js').merge({
    output: {
        filename: 'bundle.min.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        importLoaders: 1,
                        localIdentName: "[hash:base64:10]",
                        minimize: true
                    }
                },
                { loader: 'postcss-loader' },
            ]
        }]
    },
    plugins: [
        new UglifyJsPlugin({
            test: /\.js($|\?)/i,
            sourceMap: true
        })
    ]
});
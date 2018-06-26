import webpack from 'webpack';
import Config from 'webpack-config';

export default new Config().extend('conf/webpack.base.config.js').merge({
    mode: 'none',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        'react-hot-loader/patch',
        __dirname + '/../dev/index.js'
    ],
    devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        importLoaders: 1,
                        localIdentName: "[local]__[hash:base64:5]",
                        minimize: false
                    }
                },
                { loader: 'postcss-loader' },
            ]
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
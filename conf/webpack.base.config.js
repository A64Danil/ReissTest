
import webpack from 'webpack';
import Config from 'webpack-config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import precss from 'precss';

export default new Config().merge({
    entry: './dev/index.js',
    output: {
        path: __dirname + '/../public',
    },
    module: {
        rules: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './dev/index.html',
            inject: "body"
        }),
        new webpack.LoaderOptionsPlugin({ options: { postcss: [precss, autoprefixer] } })
    ]
});
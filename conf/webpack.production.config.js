import Config from "webpack-config";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";

export default new Config().extend("conf/webpack.base.config.js").merge({
	devtool: "source-map",
	output: {
		filename: "bundle.min.js"
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader!sass-loader"
				})
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: "css-loader",
							options: {
								modules: true,
								importLoaders: 1,
								localIdentName: "[hash:base64:8]",
								minimize: true
							}
						},
						{ loader: "postcss-loader" }
					]
				})
			}

			/* Old Css settings
            {
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
        }
            */
		]
	},
	plugins: [
		new UglifyJsPlugin({
			test: /\.js($|\?)/i,
			sourceMap: true
		}),
		new ExtractTextPlugin("style.min.css")
	]
});

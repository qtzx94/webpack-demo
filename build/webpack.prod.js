const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const prodConfig = { // module.exports是CommonJS写法
	mode: 'production',
	devtool: 'cheap-module-source-map',
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader, // style-loader是将合并后的css文件挂载到head标签下的style标签里
					'css-loader' // css-loader合并多个.css文件为一个css文件
				]
			}, {
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2, // 表示所有的scss文件都会依次从下到上执行所有loader（2表示执行css-loader之前的两个postcss-loader和sass-loader）
							// modules: true // 开启css模块化打包，即一个css文件只对当前模块生效
						}
					},
					'sass-loader',
					'postcss-loader'
				] // loader执行顺序:从下往上，从右到左，所以先执行sass-loader将scss翻译成css，再执行css-loader和style-loader
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[name].chunk.css'
		})
	],
	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})]
	}
}

module.exports = merge(commonConfig, prodConfig);
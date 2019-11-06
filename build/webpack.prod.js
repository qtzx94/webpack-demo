const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const prodConfig = { // module.exports是CommonJS写法
	mode: 'production',
	// devtool: 'cheap-module-source-map',
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
		}),
		new WorkboxPlugin.GenerateSW({ // SW：service worker ，workbox-webpack-plugin插件作用：当第一次成功访问网页后，第二次网站宕机后依然可以通过本地缓存访问网站
			clientsClaim: true,
			skipWaiting: true
		})
	],
	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})]
	},
	output: {
		filename: '[name].[contenthash].js', // [name]是指entry里面的'main'，即打包后文件名为main.js
		chunkFilename: '[name].[contenthash].js'
	}
}

module.exports = prodConfig;
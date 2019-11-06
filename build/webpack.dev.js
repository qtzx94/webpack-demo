const webpack = require('webpack');

const devConfig = { // module.exports是CommonJS写法
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: './dist', // 在哪个目录下启动服务器
		open: true,
		port: 8083,
		// hot: true,
		// hotOnly: true // 不支持HMR，或者是HMR有问题也不刷新浏览器
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					'style-loader', // style-loader是将合并后的css文件挂载到head标签下的style标签里
					'css-loader' // css-loader合并多个.css文件为一个css文件
				]
			}, {
				test: /\.scss$/,
				use: [
					'style-loader',
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
		new webpack.HotModuleReplacementPlugin(),
		// new BundleAnalyzerPlugin()
	],
	output: {
		filename: '[name].js', // [name]是指entry里面的'main'，即打包后文件名为main.js
		chunkFilename: '[name].js'
	}
}

module.exports = devConfig;
const path = require('path');

module.exports = { // module.exports是CommonJS写法
	/**
	 * 单入口文件打包
	 */
	mode: 'development',
	entry: {
		main: './src/index.js', // 入口文件，即webpack开始打包的入口
	},
	output: {
		path: path.resolve(__dirname + '/dist'), //打包出口文件路径
		filename: 'bundle.js',
	},
	module: {
		rules: [{
			test: /\.(png|jpg|gif)?$/,
			use: [{
				loader: "url-loader", // url-loader把图片转化为base64存放在bundle.js中，当图片大小很小时，适用,可以减少一次图片的http请求，当图片过大时，会造成bundle.js文件过大，加载bundle.js文件过长
				options: {
					// placeholder
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 204800 // 当图片资源大于200Kb时，不会转化为base64存放在bundle.js中，而是生成一个图片文件
				}
			}]
		}, {
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader'
			] // css-loader合并多个.css文件为一个css文件，style-loader是将合并后的css文件挂载到head标签下的style标签里
		}, {
			test: /\.scss$/,
			use: [
				'style-loader', 
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2, // 表示所有的scss文件都会依次从下到上执行所有loader（2表示执行css-loader之前的两个postcss-loader和sass-loader）
						modules: true // 开启css模块化打包，即一个css文件只对当前模块生效
					}
				}, 
				'sass-loader',
				'postcss-loader'
			] // loader执行顺序:从上到下，从右到左，所以先执行sass-loader将scss翻译成css，再执行css-loader和style-loader
		}]
	}
}
const path = require('path');

module.exports = { // module.exports是CommonJS写法
	/**
	 * 单入口文件打包
	 */
	mode: 'production',
	entry: {
		main: './index.js', // 入口文件，即webpack开始打包的入口
	},
	output: {
		path: path.resolve(__dirname + '/dist'), //打包出口文件路径
		filename: 'bundle.js',
	},
	module: {
		rules: [{
			test: /\.(png|jpg)?$/,
			use: [{
				loader: "file-loader"
			}]
		}]
	}
}
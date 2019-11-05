const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

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
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	optimization: {
		usedExports: true
	}
}

module.exports = merge(commonConfig, devConfig);
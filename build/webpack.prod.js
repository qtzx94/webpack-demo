const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const prodConfig = { // module.exports是CommonJS写法
	mode: 'production',
	devtool: 'cheap-module-source-map'
}

module.exports = merge(commonConfig, prodConfig);
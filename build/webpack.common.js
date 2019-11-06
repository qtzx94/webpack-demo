const path = require('path');
// htmlWebpackPlugin 插件会在打包结束后，自动生成一个html文件，并把打包生成的js文件自动引入到这个html文件中 
const HtmlWebpackPlugin = require('html-webpack-plugin'); // HtmlWebpackPlugin打包之后运行
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // CleanWebpackPlugin打包之前运行，用来删除dist文件夹
const webpack = require('webpack');

module.exports = {
	entry: {
		main: './src/index.js' // 入口文件，即webpack开始打包的入口(如果没有配置output['filename']，则输出默认叫main.js,即key值)
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
			test: /\.(eot|ttf|svg|woff|woff2)$/,
			use: {
				loader: 'file-loader'
			}
		},{
			test: /\.js$/,
			exclude: /node_modules/, // babel-loader在做语法解析的时候会忽略/node_modules文件夹下的第三方模块代码，加快打包速度
			loader: 'babel-loader' // babel-loader配置信息在.babelrc文件中，执行顺序是自下而上，从右往左
			// options: {
			// 	"plugins": [["@babel/plugin-transform-runtime", {
			// 		"absoluteRuntime": false,
			// 		"corejs": 2,
			// 		"helpers": true,
			// 		"regenerator": true,
			// 		"useESModules": false
			// 	}]]
			// }
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({ // HtmlWebpackPlugin用于自动生成html文件
			template: 'src/index.html'
		}),
		new CleanWebpackPlugin(), // 清除打包后的目录文件
		new webpack.ProvidePlugin({
			$: 'jquery',
			_join: ['lodash', 'join']
		})
	], 
	optimization: {
		runtimeChunk: {
			name: 'runtime' // runtime.js用于放置连接main.js和vendors.js之间的关系 manifest
		},
		usedExports: true,
		splitChunks: {
      chunks: 'all', // 当chunks为initial即打包同步代码时，需要配合cacheGroups参数
      minSize: 30000, // 大于30kb才进行代码分割
      maxSize: 0,
      minChunks: 1, // 当一个模块被至少用了多少次的时候才使用代码分割
      maxAsyncRequests: 5,
      maxInitialRequests: 3, // 入口文件最多只能分割成3个文件
      automaticNameDelimiter: '~', // delimiter:分隔符
      automaticNameMaxLength: 30,
      name: true,
      cacheGroups: { // 之所以称为缓存组：当引入多个模块时，先放入缓存组中，最后生成一个vendors.js，如果没有cacheGroups参数配置，那么多个模块会分割成多个文件而非最终合并成一个文件
        vendors: { 
          test: /[\\/]node_modules[\\/]/,
					priority: -10, // priority:优先级，数字越大，优先级越高，即当模块同时满足vendors和default条件时，先放入优先级高的组中，即vendors.js中
					name: 'vendors' // vendors.js放置的是库，main.js放置的是业务逻辑
        },
        default: {
          priority: -20,
					reuseExistingChunk: true, // 忽略之前已经被打包的模块，直接复用之前的
					filename: 'common.js'
        }
      }
    }
	},
	performance: false,
	output: {
		path: path.resolve(__dirname + '/../dist') //打包出口文件路径
	}
}
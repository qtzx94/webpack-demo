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
		}, {
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
		}, { 
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
  ],
  output: {
		publicPath: '/',
		path: path.resolve(__dirname + '/dist'), //打包出口文件路径
		filename: '[name].js' // [name]是指entry里面的'main'，即打包后文件名为main.js
	}
}

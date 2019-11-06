const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  externals: ['lodash'], // 打包时忽略lodash库，不要将其打包至library.js中
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.js',
    library: 'library', // 可以通过script标签导入
    libraryTarget: 'umd' // 可以通过（AMD、CommonJS等等）方式引入这个库
  }
}
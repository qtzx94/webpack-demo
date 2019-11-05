// 第一种方式，即在业务逻辑代码中引入lodash
// import _ from 'lodash';
// 此时webpack打包时会将lodash插件与业务逻辑代码合并打包成一个main.js
// 当页面业务逻辑发生变化时，又要重新打包
console.log(_.join(['a', 'b', 'c'], '***'));

// 第二种方式(Code Splitting),将lodash单独引用，打包入口文件拆分成两个文件，main.js和lodash.js
// 当页面逻辑发生改变时，重新打包的只是业务逻辑代码，lodash不变，会在用户第一次访问时缓存在浏览器中，加快访问速度
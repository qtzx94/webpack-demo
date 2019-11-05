// function getComponent() {
//   // /**/ 魔法注释magic comments
//   return import(/* webpackChunkName:"lodash" */ 'lodash').then(({ default: _ }) => {
//     var element = document.createElement('div');
//     element.innerHTML = _.join(['qtzx', '94'], '--');
//     return element;
//   })
// }

// 懒加载lazy loading, 使用import按需异步加载，在需要用到该模块的时候再进行加载

// async/await写法
// async function getComponent() {
//   const { default: _ } = await import(/* webpackChunkName:"lodash" */ 'lodash');
//   const element = document.createElement('div');
//   element.innerHTML = _.join(['qtzx', '94'], '--');
//   return element;
// }

// document.addEventListener('click', () => {
//   getComponent().then(element => {
//     document.body.appendChild(element);
//   }); 
// })

// import _ from 'lodash';

// var element = document.createElement('div');
// element.innerHTML = _.join(['qtzx', '94'], '--');
// document.body.appendChild(element);


// 同步代码写法
// document.addEventListener('click', () => {
//   const element = document.createElement('div');
//   element.innerHTML = 'qtzx94';
//   document.body.appendChild(element);
// })

// 异步写法
document.addEventListener('click', () => {
  import(/* webpackPrefetch: true */ './click.js').then(({ default: func }) => {
    func();
  })
});

// 使用异步加载可以提高code coverage即首次加载代码覆盖率，使用缓存能提升的性能很少
// eg：页面登录模块，可以使用prefetch加载，既不会影响首屏加载速度，又不会出现在用户点击时再加载时造成的用户体验下降，为最优
// 使用webpackPrefetch/webpackPreload来预加载，其中prefetch是在页面主要文件已加载完毕后，即当前带宽空闲下来时加载文件，
// 而preload是和主要文件同时下载，所以使用prefetch最优

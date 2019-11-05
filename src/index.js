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
async function getComponent() {
  const { default: _ } = await import(/* webpackChunkName:"lodash" */ 'lodash');
  const element = document.createElement('div');
  element.innerHTML = _.join(['qtzx', '94'], '--');
  return element;
}

document.addEventListener('click', () => {
  getComponent().then(element => {
    document.body.appendChild(element);
  }); 
})

// import _ from 'lodash';

// var element = document.createElement('div');
// element.innerHTML = _.join(['qtzx', '94'], '--');
// document.body.appendChild(element);
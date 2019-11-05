// function getComponent() {
//   // /**/ 魔法注释magic comments
//   return import(/* webpackChunkName:"lodash" */ 'lodash').then(({ default: _ }) => {
//     var element = document.createElement('div');
//     element.innerHTML = _.join(['qtzx', '94'], '--');
//     return element;
//   })
// }

// getComponent().then(element => {
//   document.body.appendChild(element);
// }); 

import _ from 'lodash';

var element = document.createElement('div');
element.innerHTML = _.join(['qtzx', '94'], '--');
document.body.appendChild(element);

// import test from './test';

// console.log(test.name);
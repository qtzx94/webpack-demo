// import "@babel/polyfill"; // polyfill 会污染全局环境

const arr = [
  new Promise(() => {}),
  new Promise(() => {})
];

arr.map(item => {
  console.log(item);
})
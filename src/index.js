function getComponent() {
  return import('lodash').then(({ default: _ }) => {
    var element = document.createElement('div');
    element.innerHTML = _.join(['qtzx', '94'], '--');
    return element;
  })
}

getComponent().then(element => {
  document.body.appendChild(element);
});
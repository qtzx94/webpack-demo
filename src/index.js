import "@babel/polyfill"; // polyfill 会污染全局环境

import React, { Component } from 'react';
import ReactDom from 'react-dom';

class App extends Component {
  render() {
    return <div>Hello World</div>
  }
}

ReactDom.render(<App />, document.getElementById('root'));
// var Header = require('./header.js');
// var Sidebar = require('./sidebar.js');
// var Content = require('./content.js');
// var mm = require('./mm3.jpg');

// new Header();
// new Sidebar();
// new Content();

import mm from './mm3.jpg';

var img = new Image();
img.src = mm;

var root = document.getElementById('root');
root.append(img);
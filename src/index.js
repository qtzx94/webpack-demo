// var Header = require('./header.js');
// var Sidebar = require('./sidebar.js');
// var Content = require('./content.js');
// var mm = require('./mm3.jpg');

// new Header();
// new Sidebar();
// new Content();

import mm from './mm3.jpg';
import style from './index.scss';
import createMm3 from './createMm3';

createMm3();

var img = new Image();
img.src = mm;
img.classList.add(style.mm3);

var root = document.getElementById('root');
root.append(img);

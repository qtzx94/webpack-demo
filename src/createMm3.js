import mm from './mm3.jpg';
import style from './index.scss';

function createMm3() {
  var img = new Image();
  img.src = mm;
  img.classList.add(style.mm3);

  var root = document.getElementById('root');
  root.append(img);
}

export default createMm3;
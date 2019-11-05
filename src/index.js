// Tree Shaking（只支持ES Module写法引入即import... from...），作用：引入模块时，只引入其中需要的代码

import { add } from './math';

add(1, 10);
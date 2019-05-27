const path = require('path');


console.log('当前脚步执行的文件路径：' + __filename);


console.log("当前脚本执行的目录：" + __dirname);

let reslovePath = path.resolve(__dirname,'../dist');
console.log(reslovePath);
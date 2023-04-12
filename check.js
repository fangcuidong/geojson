/**
 * 删除爬取错误的数据
 */

const fs = require('fs');
const path = require('path');

const folderPath = './output'; // 文件夹路径

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }
  let arr = [];
  files.forEach((file) => {
    const filePath = path.join(folderPath, file);

    // 判断是否为文件
    if (fs.lstatSync(filePath).isFile()) {
      // 读取文件内容
      const fileContent = fs.readFileSync(filePath, 'utf8');
      // 判断是否以{开头
      if (!fileContent.trim().startsWith('{')) {
        // console.log(`${filePath} starts with '<?xml'.`);
        arr.push(file.split('.')[0]);
        // 删除此文件
        fs.unlink(filePath, (err) => {
          if (err) throw err;
          console.log('文件已成功删除');
        });
        
      }
    }
  });
  console.log(arr);
});

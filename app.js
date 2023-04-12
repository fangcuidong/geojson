/**
 *  中国主要城市地图
 */
const https = require('https');
const fs = require('fs');

function getJSON(areaCode) {
  let url = `https://geo.datav.aliyun.com/areas_v3/bound/${areaCode}_full.json`;
  const outputFilename = `./output/${areaCode}.json`;
  https.get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      // 判断是否以{开头
      if (!data.trim().startsWith('{')) {
        return;
      }

      fs.writeFile(outputFilename, data, (err) => {
        if (err) {
          console.error(`Error writing file: ${err}`);
        } else {
          console.log(`Data saved to ${outputFilename}`);
        }
      });
    });
  }).on('error', (err) => {
    console.error(`Error fetching data: ${err}`);
  });
}


const map = require('./china-main-city-map');
const mapArr = Object.values(map);

const dirPath = './output';

// 检查目录是否存在
if (fs.existsSync(dirPath)) {
  // 如果目录存在，先删除目录及其内容
  fs.rmdirSync(dirPath, { recursive: true });
}

// 创建目录
fs.mkdirSync(dirPath);

mapArr.forEach((item) => {
  getJSON(item);
});
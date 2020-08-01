const request = require('request');
const fs = require('fs');

const args = process.argv.slice(2);
const url = args[0];
const path = args[1];
const stats = fs.statSync(path);
const fileSizeInBytes = stats["size"];

request(url, (_error, response, body) => {
  if (response.statusCode !== 200) {
    console.log(`Error code ${response.statusCode}`);
    process.exit();
  } else {
    fs.writeFile(path, body, () => {
      console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${path}`);
    });
  }
});
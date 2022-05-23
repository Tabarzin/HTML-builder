const path = require('path');
const fs = require('fs');
const srcPath = path.join(__dirname, 'styles');
const destPath = path.join(__dirname, 'project-dist');

const fsPromises = fs.promises;

fs.readdir(srcPath, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      let filePath = path.join(srcPath, file);

      fs.stat(filePath, (error, stats) => {
        if (stats.isFile() && path.extname(file) == '.css') {
          const reader = fs.createReadStream(filePath);

          reader.on('data', (data) => {
            fs.appendFile(
              '05-merge-styles/project-dist/bundle.css',
              data.toString(),
              (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log('Success!');
                }
              }
            );
          });
        } else {
          return;
        }
      });
    });
  }
});

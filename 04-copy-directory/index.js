const path = require("path");
const destPath = path.join(__dirname, "files-copy");
const srcPath = path.join(__dirname, "files");
const fs = require("fs");
const fsPromises = fs.promises;

fsPromises.mkdir(destPath, { recursive: true });

fs.readdir(srcPath, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      let filePath = path.join(srcPath, file);
      let fileCopyPath = path.join(destPath, file);

      fs.copyFile(filePath, fileCopyPath, (err) => {
        if (err) {
          console.error("Sorry, I failed to copy ", err);
          return;
        }
        console.log("File successfuly copied");
      });
    });
  }
});

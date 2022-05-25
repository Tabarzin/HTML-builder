const path = require("path");
const destPath = path.join(__dirname, "files-copy");
const srcPath = path.join(__dirname, "files");
const fs = require("fs");
const fsPromises = fs.promises;

fs.access("04-copy-directory/files-copy", (err) => {
  if (err) {
    createDir();
  } else {
    fs.rm("04-copy-directory/files-copy", { recursive: true }, (err) => {
      if (err) {
        return console.log("error occurred in deleting directory");
      }

      createDir();
    });
  }
});

function createDir() {
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
}

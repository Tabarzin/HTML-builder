const path = require("path");
const destPath = path.join(__dirname, "project-dist");
const compsPath = path.join(__dirname, "components");
const indexPath = path.join(__dirname, "project-dist/index.html");
const templPath = path.join(__dirname, "template.html");
const stylePath = path.join(__dirname, "styles");
const fs = require("fs");
const fsPromises = fs.promises;

fs.access(destPath, (error) => {
  if (error) {
    
  } else {
    fs.rm(destPath, { recursive: true, force: true }, (err) => {
      if (err) {
        return;
      }
      buildProject();
    });
  }
});

function buildProject() {
  fsPromises.mkdir("06-build-page/project-dist", { recursive: true });
}

//buildProject();

// Read template

let templateStr;
let fileContent;

fs.readFile(templPath, "utf8", function (err, data) {
  templateStr = data;
});

// Read components

fs.readdir(compsPath, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      const filePath = path.join(compsPath, file);
      let fileName = path.basename(filePath, ".html");

      fs.stat(filePath, (error, stats) => {
        if (stats.isFile() && path.extname(file) == ".html") {
          fs.readFile(filePath, "utf8", function (err, data) {
            fileContent = data;

            templateStr = templateStr.replace(`{{${fileName}}}`, fileContent);
            let writeStream = fs.createWriteStream(
              indexPath,
              "UTF-8",
              "index.html"
            );
            writeStream.write(templateStr);
          });
        }
      });
    });
  }
});

// Create CSS bundle

fs.readdir(stylePath, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      let filePath = path.join(stylePath, file);

      fs.stat(filePath, (error, stats) => {
        if (stats.isFile() && path.extname(file) == ".css") {
          const reader = fs.createReadStream(filePath);

          reader.on("data", (data) => {
            fs.appendFile(
              "06-build-page/project-dist/style.css",
              data.toString(),
              (err) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Success!");
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

// Copy assets

async function copyAssets(src, dest) {
  const elems = await fsPromises.readdir(src, { withFileTypes: true });
  await fsPromises.mkdir(dest, { recursive: true });
  for (let elem of elems) {
    const srcPath = path.join(src, elem.name);
    const destPath = path.join(dest, elem.name);
    if (elem.isDirectory()) {
      await copyAssets(srcPath, destPath);
    } else {
      await fsPromises.copyFile(srcPath, destPath);
    }
  }
}

copyAssets("06-build-page/assets", "06-build-page/project-dist/assets");

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
      fs.rm(destPath, { recursive: true, force: true  }, (err) => {
        if (err) {
      // console.error(err)
        
        return
        } 
        buildProject();
    });
    }
  });


function buildProject() {
  
      fsPromises.mkdir('06-build-page/project-dist', { recursive: true });
      
   
}

buildProject();


// Read template

  let templateStr;
  let fileContent

  fs.readFile(templPath, "utf8", function (err, data) {
    templateStr = data;

    
   //console.log(templateStr);
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
              let writeStream = fs.createWriteStream(indexPath, 'UTF-8', "index.html");
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
          if (stats.isFile() && path.extname(file) == '.css') {
            const reader = fs.createReadStream(filePath);
  
            reader.on('data', (data) => {
              fs.appendFile(
                '06-build-page/project-dist/style.css',
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
  

  
// Copy assets

async function copyAssets(src, dest) {
  const elems = await fsPromises.readdir(src, {withFileTypes: true});
  await fsPromises.mkdir(dest);
  for(let elem of elems) {
      const srcPath = path.join(src, elem.name);
      const destPath = path.join(dest, elem.name);
      if(elem.isDirectory()) {
          await copyAssets(srcPath, destPath);
      } else {
          await fsPromises.copyFile(srcPath, destPath);
      }
  }
}

copyAssets('06-build-page/assets', '06-build-page/project-dist/assets')



// fs.readdir(compsPath, (err, files) => {
//   if (err) console.log(err);
//   else {
//     files.forEach((file) => {
//       const filePath = path.join(compsPath, file);
//       let fileName = path.basename(filePath, ".html");

//       fs.stat(filePath, (error, stats) => {
//         if (stats.isFile() && path.extname(file) == ".html") {
//           const reader = fs.createReadStream(filePath);

//           reader.on("data", (data) => {
//             // console.log(data.toString())
//             let fileData = data.toString();
//             let templateStr;
//             fs.readFile(templPath, "utf8", function (err, data) {
//               templateStr = data.toString();

//               templateStr = templateStr.replace(`{{${fileName}}}`, fileData);
//               console.log(templateStr);
//             });

//             fs.appendFile(indexPath, templateStr, (err) => {
//               if (err) {
//                 console.log(err);
//               } else {
//                 console.log("Success!");
//               }
//             });
//           });
//         } else {
//           return;
//         }
     // });

      //    let test = fs.readFile(filePath, 'utf8', function(err, data){

      //       //console.log(test);
      //   });

      //   const templPath = path.join(__dirname, "template.html");

      //   fs.readFile(templPath, 'utf8', function(err, data){
      //     let templateStr = data;

      //  templateStr = templateStr.replace(`{{${fileName}}}`, test);
      //  console.log(templateStr)
   // });

    //     fs.stat(filePath, (error, stats) => {
    //       if (stats.isFile() && path.extname(file) == '.html') {
    //         //
    //         // console.log(fileName);

    //         const reader = fs.createReadStream(templPath);

    //         reader.on('data', (data) => {
    //           let templateContent = data.toString();
    //           console.log(templateContent);

    //           templateContent.replace("{{header}}", )

    //         //   fs.appendFile(
    //         //     '05-merge-styles/project-dist/bundle.css',
    //         //     data.toString(),
    //         //     (err) => {
    //         //       if (err) {
    //         //         console.log(err);
    //         //       } else {
    //         //         console.log('Success!');
    //         //       }
    //         //     }
    //         //   );
    //          });
    //       } else {
    //         return;
    //       }
//     //     });
//   }
// });

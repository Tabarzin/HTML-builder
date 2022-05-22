const path = require('path');
const dirPath = path.join(__dirname, 'secret-folder');
const fs = require('fs');

let name, ext, size;


fs.readdir(dirPath, (err, files) => {

  if (err)
    console.log(err);
  else {


    files.forEach(file => {

      let filePath = path.join(dirPath, file);


      fs.stat(filePath, (error, stats) => {


        if (stats.isFile(file)) {

          
          name = path.parse(file).name;
          ext = path.parse(file).ext;
          size = stats.size;



        }

        console.log(name, ' - ', ext, ' - ', size, 'Kb')

      })

     


    })
  }
})


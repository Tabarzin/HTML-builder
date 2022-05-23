const fs = require('fs');
const process = require('process');
const readline = require('readline');
const path = require('path');    
const filePath = path.join(__dirname, 'text.txt');

let writeStream = fs.createWriteStream(filePath, 'UTF-8', 'text.txt');



var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
  
 
});

rl.on('SIGINT', () =>{
  console.log('Thank you! Have a nice cross-check!');
  process.exit();
});


function write() {

  rl.question('Hey, student1, please write something \n ', function(answer) {

    if (answer.toLowerCase().trim() === 'exit') {
      console.log('Thank you! Have a nice cross-check!');
      rl.close();
    }
    else {
      writeStream.write(answer + '\n');
      write();
    }

  
  });

}

write();
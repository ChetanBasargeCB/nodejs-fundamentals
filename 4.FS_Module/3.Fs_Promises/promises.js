
const { log } = require("console");
const fs = require("fs");
const path = require("path");

// Geting the file list from the dirctoy 

// reddir --> fs.promises.reddir().then().catch()

// const dirctory = __dirname

// fs.promises.readdir(dirctory)
// .then((data)=>console.log(data)).catch((err)=>console.log(err)
// )

//Create / Write File using Promises _Module
const filename = "Promises.txt";
const filepath = path.join(__dirname,filename)

fs.promises.writeFile(filepath,"This is Promies Content","utf-8")
.then(console.log("File Created ")).catch((err)=>console.log(err)
)

//Read file 
 
fs.promises.readFile(filepath,"utf-8")
.then((data)=>console.log(data))
.catch((err)=>console.log(err))

// Update File
fs.promises.appendFile(filepath,"\n Promises Updated line","utf-8")
.then(console.log("File Updated")).catch((err)=>console.log(err))



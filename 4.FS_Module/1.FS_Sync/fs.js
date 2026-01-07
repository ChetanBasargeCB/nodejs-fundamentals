//--- Creating a file / Writing 
// Syntax --->   fs.writeFilesync(path,data,option)
//   --here first provide  path, if file is not available it creates a new file  -- data -> Whatever you want add to file write

const fs = require("fs")    // 🔴 folder it not work  because installing type-module in packege.json 
const path = require("path")

const filename = "test.txt";
const filepath = path.join(__dirname, filename)

const writeFile = fs.writeFileSync("filepath", " My first file creation Updated", "utf-8")


// Reading Data with FS_ Module 
// Syntax -->  fs.readFileSync("path", option)  
// if you forgot adding option data will get in binary format

const ReadFiles = fs.readFileSync("filepath", "utf-8")
console.log(ReadFiles)
// Updating File with Fs_ Module 
// syntax --> fs.appendFileSync("path","data","option")

const updateFile = fs.appendFileSync("filepath", "\n Data appended", "utf-8")

const ReadFile = fs.readFileSync("filepath", "utf-8")
console.log(ReadFile)


// // Delete File with Fs_Module
//     // Syntax --> fs.unlinkSync(path)
//     const Delete = fs.unlinkSync("filepath")


// Rename File with Fs_Module
// Syntax --> fs.renameSync("oldpath","newpath")


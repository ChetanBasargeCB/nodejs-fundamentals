// Fs Module with Async

// Create/ write file with Fs_module
    // Sx --> fs.writeFile(path,data,option,callback)
const fs = require("fs")
const path = require("path")

const filename = "Text.txt";
const filepath = path.join(__dirname,filename)

const writeFile = fs.writeFile("filepath","This is initial Data","utf-8",(err)=>{
    if(err){
        console.error(err)
    } else console.log("File Created")
})



// Read file with Fs_module
    // Sx --> fs.ReadFile(path,option,callback(err,data))
const ReadFile = fs.readFile("filepath","utf-8",(err,data)=>{
    if(err){
        console.error(err)
    } else console.log(data)
})



// Update file with Fs_module
    // Sx --> fs.appenFile(path,data,option,callback)
const updateFile = fs.appendFile("filepath", "\n Data Appended", "utf-8",(err,)=>{
    if(err){
        console.error(err)
    } else console.log(" data updated")
})

// // Delete file with Fs_module
//     // Sx --> fs.unlink(path,callback)
// const Deletefile = fs.unlink("filepath",(err,)=>{
//     if(err){
//         console.error(err)
//     } else console.log(" File Deleted")
// })







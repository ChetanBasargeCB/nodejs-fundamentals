import {createReadStream,createWriteStream} from 'fs'
import path from 'path'

const Read_Path = path.join(import.meta.dirname,"input.txt")

const Write_Path = path.join(import.meta.dirname,"output.txt")

// Data Sending in limited chunk --16
const Read = createReadStream(Read_Path,{encoding:'utf-8',highWaterMark:16})

const Write = createWriteStream(Write_Path)

//Copying one file to another file
Read.pipe(Write)
// Error Handling
Read.on("error",(err)=>console.log("Error:",err))
Write.on("error",(err)=>console.log("Error:",err))


const fs = require("fs/promises") // fs/promises --> it means not need to write promises in every time
const path = require("path")

const filename = "async&awit.txt"
const fielpath = path.join(__dirname,filename)

//-----Creating/writing File 

const createfile= async ()=>{
    try{
       await fs.writeFile(fielpath,"The Async and Await file data", "utf-8")
        console.log("File Created ")
    }
    catch(err){
        console.log(err)
    }
}
createfile()

//-----Reading File 

const readfile = async ()=>{
        try{
           const data = await fs.readFile(fielpath,"utf-8")
            console.log(data)
        } catch(err){
            console.log(err)
        }

}
readfile()


//-----Update fileData

const updatefile = async ()=>{
    try {
       await fs.appendFile(fielpath,"\nThis is Updated line","utf-8")
        console.log("File Updated")
    } catch (error) {
        console.log(err)
    }
}

updatefile()

// ------Delete File 

// const deletefile= async ()=>{
//     fs.unlink(fielpath)
// }
// deletefile()

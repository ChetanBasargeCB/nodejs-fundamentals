import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

//! using Cors middleware
app.use(cors())
app.use(express.json())

const URI = process.env.URI
mongoose.connect(URI)

const messageSchema = mongoose.Schema({
    name:String,
    message:String
})

const text = new mongoose.model("text",messageSchema)

const insertData = async (name,message)=>{
    try{
     const doc =  await text.insertMany({name:name,message:message})
     return doc
       console.log("Message Added")
    } catch(error){
        console.log(error);
        
    }

}

app.get("/",async (req,res)=>{
    const data = await text.find()
    res.json(data)
})

app.post("/", async(req,res)=>{
    const name = req.body.name;
    const message =req.body.message
    const data = await insertData(name,message)
    res.json(data)
})

app.delete("/:id",(req,res)=>{
    const id = req.params.id
    console.log(id)
    res.json({message : "Data is Deleted"})
})


app.listen(PORT,()=>console.log("Server Started ")
)

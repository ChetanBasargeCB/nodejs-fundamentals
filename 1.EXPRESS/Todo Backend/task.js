import express, { text } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
dotenv.config()

const app = express()
const PORT = process.env.PORT
const URI = process.env.URI

app.use(cors())
app.use(express.json())

mongoose.connect(URI).then(()=>console.log("database connected ")).catch(err=>console.log(err))

const taskSchema = mongoose.Schema({
    id:{
        type:Number,
        required:true,
         unique: true, 
    },
    task:{
        type:String,
        required:true
    }
})
const task = new mongoose.model("task",taskSchema)
//! CURD 

const getData = async()=>{
    const data = await task.find()
    return data
}

const insertData = async(id,tasks)=>{
    try {
        const data = await task.create({id:id,task:tasks})
        console.log("Task added");
        return data
        
    } catch (error) {
       console.log("insert",error);
       
    }
}

const deleteData = async (id)=>{
    try {
        const data = await task.deleteOne({id:id})
        console.log("Task Deleted");
        

    } catch (error) {
        console.log("Delete",error)
    }
}
app.get("/", async(req,res)=>{
        const data = await getData()
        res.json(data)
})

app.post("/", async(req,res)=>{
    const id = req.body.id;
    const tasks = req.body.task;
    const data = await insertData(id,tasks)
    res.json({message:" Your Task Added!!😎"})

})

app.delete("/:id", async(req,res)=>{
    const id =  req.params.id;
    console.log(id)
    const data = await deleteData(id)
    res.json({message:"Task has been Deleted🫡"})
})

app.listen(PORT,()=>console.log(`server running at ${PORT}`)
)

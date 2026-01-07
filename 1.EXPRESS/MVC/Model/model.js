//! In this Model folder write Db reletaed code 
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const uri = process.env.URI
mongoose.connect(uri).then(()=>console.log("MongoDB Connected")
)

//? Schema
const MVCSchema = mongoose.Schema({
    id:{type:Number,require:true},
    name:String,
    Lname:String
})

//? Model

const user = new mongoose.model("user",MVCSchema)

export default user
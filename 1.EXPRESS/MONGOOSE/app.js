import mongoose from 'mongoose'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

const PORT = process.env.PORT  || 3000
const uri = process.env.uri

//! Connecting Srever and db
mongoose.connect(uri)

//! Create a Schema (Validation like sql table)
const userSchema = new mongoose.Schema({
    name:String,
    age:Number,
    have_job:Boolean,
    colors:[String]
})


//! Create Module (Collection) pass here schema validation
const user = mongoose.model('user',userSchema)

const user1 = {
    name:"Chetan",
    age:22,
    have_job:false,
    colors:["green","red"]
}

//? writr db query using function

const main = async ()=>{
        try {
            //  await user.insertMany(user1) 
            console.log("data inserted")
            const data = await user.findOne()
            console.log(data)
        } catch (error) {
            console.log(error);
            
        }
}
main()

app.get("/",(req,res)=>{
    res.send("Welcome to Mongoose Connection")
})

app.listen(PORT,()=>console.log(`Server Started at ${PORT}`))

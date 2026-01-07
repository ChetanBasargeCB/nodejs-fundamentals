import express, { json } from "express"
import { MongoClient } from "mongodb"
import dotenv from 'dotenv'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

//! Connecting MongoDB url
const URL = process.env.url
// console.log(url)

//? Creating instanceof
const client = new  MongoClient(URL)

//! Connecting to DB ( async/await)

const main = async ()=>{
    await client.connect()    // connecting mongo server
    const db = client.db("Car_Delrship")   //connecting with db
    const collection = db.collection("Cars")
   const data = await collection.find({ maker: 'Tata'}).toArray();   //! For multiple documents → use .find().toArray() data come in object that node so use toArray()
   const singleData = await collection.findOne({ maker: 'Tata'})  
   console.log(data,singleData)
   return"done"

}

main().then(()=>console.log(" MongoDB Connected..")).catch((e)=>console.log(e))
// .finally(()=>client.close())

// middelWare
app.use(express.json())

//? Routes
app.get("/",(req,res)=>{
    res.send("Home Page")
})

//? server Creation
app.listen(PORT,()=>{
    console.log(`server Running at ${PORT}`)
})


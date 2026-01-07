import mongoose from "mongoose";
import express from "express"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const PORT = process.env.PORT

//! middelware
app.use(express.json())

const uri = process.env.URI
//! Server Conecction
mongoose.connect(uri)

//! Schema Validation

const userSchema = mongoose.Schema({
    id:Number,
    name:String,
    age:Number,
    company:String,
    country:String,
})

//! Create Model 
const user = new mongoose.model("user",userSchema)

const user1 = {
    id:1,
    name:"Chetan",
    age:22,
    company:"Cognizant",
    country:"India"
}


const user2 = {
    id:2,
    name:"Ramesh",
    age:22,
    company:"MSN",
    country:"India"
}


const user3 = {
    id:3,
    name:"BOB",
    age:22,
    company:"Cognizant",
    country:"India"
}

const getalldata = async ()=>{
        try {
            // await user.insertMany([user1,user2,user3])
            // console.log("Inserted")
            const data= await user.find()
            return data
        } catch (error) {
            console.log(error);    
        }
}

const getdatabyName = async (name)=>{
    try {
        const [data,metadata]= await user.find({name:name})
        return data
    } catch (error) {
        console.log(error);
        
    }
}
//! only use when user want add data

// const addData = async (id,name,age,company,country) =>{
//     try {
//         await user.insertMany(
//             {
//     id:id,
//     name:name,
//     age:age,
//     company:company,
//     country:country
// } )
//     } catch (error) {
//         console.log(error);
        
//     }
// }


const updatedata = async (id,name)=>{
    const data = await user.updateMany({id:id},{$set:{name:name}})
    return data
}

app.get("/", async(req,res)=>{
    const data = await getalldata()
    res.json(data)

})

const deleteData = async(id)=>{
    const data = await user.deleteOne({id:id})
    return data
}
//? Routers

app.get("/:name",async(req ,res)=>{
    const name = req.params.name
    console.log(name)
    const data = await getdatabyName(name) 
    res.json(data)

})

app.post("/", async(req,res)=>{
     const { id, name, age, company, country } = req.body;
     const data = await addData(id,name,age,company,country)
     res.json(data)
    //  console.log(id, name, age, company, country);
    
})

app.patch("/", async (req,res)=>{
    const id = req.body.id
    const name = req.body.name

    const data = await updatedata(id,name)
    res.json(data)
    console.log(id,name)
})

app.delete("/:id",async(req,res)=>{
        const id = req.params.id
        console.log(id)
        const data = await deleteData(id)
        res.json(data)
})
app.listen(PORT,()=>console.log(`Server Running At for postman${PORT}`))
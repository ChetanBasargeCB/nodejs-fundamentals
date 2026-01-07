import express, { json } from 'express'
import dotenv from 'dotenv'
import mysql from 'mysql2/promise'

dotenv.config()

//? DB Connection to EJS
const db = await mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Chetan@1234",
    database:"Curd"
})
console.log("Sql Connected succesfull")

//? Create DB
// await db.execute(`CREATE DATABASE Curd`)

//? Create Table
// await db.execute(`CREATE TABLE user_data(
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(20) NOT NULL,
//     compnay VARCHAR(30) NOT NULL,
//     email VARCHAR(20) NOT NULL UNIQUE

// )`)

//? Insert Data
// await db.execute(`INSERT INTO user_data (name,compnay,email) VALUES("Chetan","xyzCompnay","chetan@gmail.com")`)
    // await db.execute(
    //   "INSERT INTO user_data (name, compnay, email) VALUES (?, ?, ?)",
    //   ["rohit","xyzs","rohit@gmail.com"]
    // );


//! Function
 async function getalldata() {
   const [data,metadata] = await db.execute(`SELECT * FROM user_data`)
   return data
 }

 async function getsingledata(id){
    const [data,metadata]= await db.execute("SELECT name,email FROM user_data WHERE id = ?",[id])
    return data
 }


 async function adddata (name,compnay,email) {
    const [data,metadata]= await db.execute(`INSERT INTO user_data (name,compnay,email) VALUES(?,?,?) `,[name,compnay,email])
    return data 
 }

 async function updatedata(name){
    const [data,metadata]= await db.execute(`UPDATE user_data SET compnay = "abcd@" WHERE name = ?`,[name])
    return data
 }

async function deletedata(id) {
    const [data]= await db.execute(`DELETE FROM user_data WHERE id= ?`,[id])
    return data
}

const app = express()

//! Important 
app.use(express.json())

const PORT = process.env.PORT || 3000


app.get("/",async (req,res)=>{
   const data = await getalldata()
   res.json(data)

})

app.get("/:id", async (req,res)=>{
    const id =  req.params.id
    console.log(id)
    const data = await getsingledata(id)
    res.json(data)
})

app.post("/", async (req,res)=>{
    const name = req.body.name;
    const compnay = req.body.compnay;
    const email = req.body.email;
    console.log(name , compnay , email)
    const data = await adddata(name,compnay,email)
    res.json(data)
    
})

app.patch("/:name",async (req,res)=>{
    const name = req.params.name;                //!---> when you pass params in url use req.params 
    console.log(name)
    const data = await updatedata(name);
    return res.json(data)
})

app.delete("/:id",async (req,res)=>{
    const id = req.params.id;
    const data = await deletedata(id)
    res.json(data)
})

app.listen(PORT,()=>console.log(`Server Running at ${PORT} ...`))
import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()

const app = express()

const PORT = process.env.PORT

// app.use(express.static("Public"))

app.get("/",(req,res)=>{
    res.send("Welcome to Home Page")
})

app.use((req,res)=>{
    res.status(404).sendFile(path.join(import.meta.dirname,"Public", "404.html"))
})

app.listen(PORT,()=>{
    console.log(PORT)
})
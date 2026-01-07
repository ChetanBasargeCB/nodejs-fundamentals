import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()

const app = express()
const PORT = process.env.PORT

app.use(express.static("Notes"))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Hi notes")
})

app.get("/react",(req,res)=>{
    const react = path.join(import.meta.dirname,"Notes","index.html")
    res.sendFile(react)
})

app.listen(PORT,()=>console.log(`Server Running ${PORT}`))
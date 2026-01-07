import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 2000

// Static File Passing 
app.use(express.static("Public"))
app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.get("/about",(req,res)=>{
    res.send("about Page")
})

app.listen(PORT,()=>{
    console.log(`Server Running At  ${PORT}`)
})
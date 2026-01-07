import express from 'express'
import dontenv from 'dotenv'
import path from 'path'
dontenv.config();

const app = express();

// static file sending
app.use(express.static("index.html"))

const PORT = process.env.PORT || 3005

app.get("/", (req,res)=> res.send("Welcome to Home Page"))

app.get("/login",(req,res)=>{
    const loginPage = path.join(import.meta.dirname,"index.html")
    res.sendFile(loginPage)
})

app.listen(PORT,()=>console.log(`Server Running at PORT ${PORT}`))
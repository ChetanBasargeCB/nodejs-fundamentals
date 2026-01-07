import express from "express";
import dotenv from "dotenv"

dotenv.config()

const app = express()

const PORT = process.env.PORT2 || 3007
 
app.get("/",(req,res)=>{
    res.send("Welcomet to Query Home Page")

})

app.get("/product",(req,res)=>{
    // console.log(req.query.search)
    // res.send(`<h1> User Search for Poroduct ${req.query.search} </h1>`)
    // Multiple Query Accress
     console.log(req.query)
    res.send(`<h1> User Search for Poroduct ${req.query.page}  ${req.query.limit} </h1>`)
})

app.listen(PORT,()=>{
    console.log(`Server Running At Port ${PORT}`)
})

// if you want access multiple query the you need  to use & ex-http://localhost:3007/product?page=2&llimit=10
import express from 'express';
import dotenv from 'dotenv'
dotenv.config(); // ✅ load .env file, without this node will not load the env file

// Creating instance of epress()
const app = express()

// const PORT = 3005;
const PORT = process.env.PORT

app.get("/",(req,res)=>  res.send("Hello Exprees!!"));
 
app.get("/about",(req,res)=>  res.send("<h1> Hello About Page </h1>"));

app.get("/contact",(req,res)=> { res.send(`<h1> Hello HTML Code </h1>`)

});

// creating server 

app.listen(PORT,()=>console.log(`Server IS Running at: ${PORT}`))

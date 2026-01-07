import exprees from 'express'
import dotenv from 'dotenv'
dotenv.config()

const app = exprees()

const PORT = process.env.PORT1 || 3006
app.get("/",(req,res)=>{
    res.send("HI Welcome to Home Page")
})

// roote pramas 👇 req.params
// Single URL Value Get-----
app.get("/profile/:username",(req,res)=>{
    res.send(`<h1> HI ${req.params.username} Welcome to Profile Page </h1>`)
    console.log(req.params)  //  it returns a object in console  ex- username 
})

// Multiple Value Get Using 'Slug' Method -----
app.get("/profile/:username/artical/:slug",(req,res)=>{
    console.log(req.params.slug)
    // Remove %20(default) form url and add space
    const formatedURL = req.params.slug.replace(/-/g, " ")
    res.send(`Hi Aritcal is wirtten by ${req.params.username}, Artical is ${formatedURL}`)
})
app.listen(PORT,()=> console.log(`Server Running At ${PORT}`))





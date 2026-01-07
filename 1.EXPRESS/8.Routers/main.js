//! Main file you can put anywhere this
import express from 'express'
const app = express()

//! Send routes req to route
import { router } from "./userRouter.js";
app.use("/user",router)
//? whenever users send req on /user/about or somthing req will go router folder routes 

const PORT = 3000
app.listen(PORT,()=>{
    console.log("Server Running ")
})
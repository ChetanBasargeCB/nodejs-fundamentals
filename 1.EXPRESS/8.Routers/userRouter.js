import express from 'express'
//! Step-1 Create Router
export const router = express.Router()
//! Define routes for main file
router.get("/",(req,res)=>{
    res.send("User's Home Page")
})

router.get("/about",(req,res)=>{
    res.send("User's About Page")
})

router.get("/contact",(req,res)=>{
    res.send("User's Contact Page <br> 44")
})
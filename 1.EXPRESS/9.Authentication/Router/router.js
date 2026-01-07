import express from 'express'

export const router = express.Router()

router.get("/",(req,res)=>{
    res.send("welcome to our hotel")
})

router.get("/room",(req,res)=>{
    res.send("Room Are Availabel")
})

router.get("/menu",(req,res)=>{
    res.send("These Menu are available")
})

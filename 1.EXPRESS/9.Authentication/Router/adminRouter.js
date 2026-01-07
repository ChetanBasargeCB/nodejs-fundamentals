import express from 'express'

export const adminRouter = express.Router()

adminRouter.get("/",(req,res)=>{
    res.send("welcome Admin")
})

adminRouter.get("/room",(req,res)=>{
    res.send("Update the Room details")
})

adminRouter.get("/menu",(req,res)=>{
    res.send("Update Menu Cart ")
})

 import { Router } from "express";
 import express from 'express'

 const router =express.Router()


 router.get("/", (res,req)=>{
    
 })

 // you can export named also

 export default router 
 
 //?  1) improt in your file 
 //?  2) how to use -->  app.use(" path ",router) -- path --> path that you want to pass all router
 
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

//! Middelware function for loggging ( for how many user come )
function logResponse(req,res,next){
    console.log(`[${new Date().toLocaleTimeString()}], Req Made to :${req.originalUrl}`) // it track which url user hits
    next()// call next function
}
//? For all Routes
// app.use(logResponse)

//! Getting router
import { router } from './Router/router.js'
import { adminRouter } from './Router/adminRouter.js'

app.use("/user", logResponse, router)
app.use("/admin/",adminRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>console.log('Server Running')
)
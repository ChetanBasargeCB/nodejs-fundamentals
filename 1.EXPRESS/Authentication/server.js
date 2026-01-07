import express from 'express'
import dotenv from 'dotenv'
import { authrouter } from './Router/authRouter.js'
import passport from 'passport'
import localStrategy from 'passport-local'
import session from 'express-session'
import Auth from './Model/model.js'
import { menuRoute } from './Router/menuRouter.js'
dotenv.config()

//!Step-1 Create Instance 
const local = localStrategy.Strategy
const app = express()

//! Step-2 Validition Proccess Using Instance
passport.use( new local
    (async(username,password,done)=>{
    try {
        //! Username Validation
        console.log("Recived User Data",username,password)
        const user = await Auth.findOne({username:username})
        if(!user) return done(null,false,{message:"Invalid Username"})

        //! Password Validation (if password in db is string always use loses comparison)
        // const isPassword = user.password == password ? true:false;
        const isPassword =  await user.comparePassword(password)
        if(isPassword){
            done(null, user)
           
        } else{ 
            done(null,false,{message:"Invalid Password"})
        }
        
    } catch (error) {
        return done(error)
   
    } 
}))
  
//! Step -3 Initiate Passport Middelware   
app.use(express.json())
app.use(passport.initialize())
app.use(express.urlencoded({ extended: true }))


const PORT = process.env.PORT

//! Step-4 Apply On Routes
const localAuthMiddelware = passport.authenticate("local",{session:false}) 

app.use("/",authrouter)

//! Authorized Middleware
app.use("/", localAuthMiddelware, menuRoute)

app.listen(PORT,()=>console.log("Server Running")
)




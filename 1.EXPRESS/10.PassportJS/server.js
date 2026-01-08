//! Authentication Practice File
//? Using Express, MongoDB, Passport

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import passport from 'passport'
import localStrategy from 'passport-local'
dotenv.config();

//! Step -1 Create Instance
const local =localStrategy.Strategy

//? Passport Local Strategy Setup
const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.URI



//! Step -2 Initiate Passport Middelware  
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())

//?  User Schema Definition
mongoose.connect(URI)
    .then(() => console.log("DB Connected")).catch((err) => console.log("DB Connection Error", err))

//? Schema Declaration
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
    },
    password: String,
});

//? Model Creation (Collection)
const User = mongoose.model("User", userSchema)

//! Step-3 Passport Local Authentication Logic 
passport.use(
    new local(async(username,password,done)=>{
        try {
            console.log("Data of User",username,password)
            //!  Check if user exists
            const isUser = await User.findOne({username:username})
            
            if(!isUser) {
                console.log("Invalid Name")
                return done(null,false,{message:"Invalid Username"})}
                
            //! Validate password
            const isPassword =  isUser.password==password ? true:false
            if(isPassword){
                done(null,isUser)
            } else{
                 console.log("Incorrect password");
                done(null,false,{message:"Invalid Password"})
            }

        } catch (error) {
            done(error)
        } 
})) 

//? CURD Opreation
const handelAddData = async (name, username, password) => {
    try {
        const data = await User.create({ name: name, username: username, password: password })
        console.log("data added in db")
        return data
    } catch (error) {
        console.log(error)
    }
}

//! Step-4  Apply On Routes
const authenticate = passport.authenticate("local",{session:false})

//! Protected Route (Requires Login)
app.get("/", authenticate,(req, res) => {
    res.send("Welcome to Authentication with PassportJS");
});
 
//?User Login Route
app.post("/", async (req, res) => {
    const { name, username, password } = req.body
    const data = await handelAddData(name, username, password) 
    res.send("Data Added")
    // console.log(name,username,password)
})
app.post( "/login", authenticate, (req, res) => {
    res.send("Login Successful");
  }
);


app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT}`);
});

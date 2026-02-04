import  User from '../Model/UserModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv/config'

export const registerController = async(req,res)=>{
        const{name,password}=req.body
        if(!name||!password){
            return res.status(400).json({message:"All fields Required"})
        }

        try {
            const exiest = await User.findOne({name});
            if(exiest) return res.status(409).json({message:"User Already exiests"})
         //Password hashing
            const hashPassword =await bcrypt.hash(password,10);
            const user = await User.create({name:name,password:hashPassword})
            res.status(201).json({message:"Account done",user:user.name,password:user.password})
        } catch (error) {
            console.log("Registrtion error",error)
            res.status(401).json({message:"registration failed"})
        }
}

export const loginController = async (req,res)=>{
    const{name,password}=req.body
       if(!name||!password){
            return res.status(400).json({message:"All fields Required"})
        }
   try {
    //Find User 
    const user = await User.findOne({name})
    if(!user) return res.status(400).json({message:"User not found"})

    // password
    const ispassword =await bcrypt.compare(password,user.password)
    if(!ispassword)return res.status(400).json({message:"Invaild Password"})
    
    //! Access token
    const accessToken = jwt.sign(
        {id:user._id},
        process.env.ACCESS_KEY,
        {expiresIn:"15m"}
    )
    console.log("Old token =",accessToken)
    //! Refresh Token
    const refreshToken = jwt.sign(
        {id:user._id},
        process.env.REFRESH_KEY,
        {expiresIn:"7d"}
    )

    // send refresh token in cookie
     res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
         secure: false, // true in production (HTTPS)
          sameSite: "strict"

     })

    return res.status(200).json({message:"Login Success",accessToken} 
        
    )

   } catch (error) {
    console.log("login error",error)
    res.status(500).json({message:"Server error"})
   }
    
}


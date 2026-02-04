import mongoose from 'mongoose'
import dotenv from 'dotenv/config'

export const ConnectDB =  async()=>{
    try {
    await mongoose.connect(process.env.URI)
        console.log("Database Connected")
    } catch (error) {
       console.log("Db Connection error",error) 
    }
}

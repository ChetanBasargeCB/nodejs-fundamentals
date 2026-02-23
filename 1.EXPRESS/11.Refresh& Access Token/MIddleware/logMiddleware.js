import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";

const logMiddqleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    console.log("Auth header:", authHeader);
    if(!authHeader){
        return res.status(401).json({message:"No authorization header found"})
    }

    const token = authHeader.split(" ")[1]; // "Bearer abc123" -> "abc123"
    console.log("Token extracted from header:", token);
    if(!token){
        return res.status(401).json({message:"Token missing in authorization header"})
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_KEY);
        console.log("Decoded token:", decoded);
        if(!decoded){
            return res.status(401).json({message:"Invalid token"})
        }   
 
        req.user =decoded; // Attach decoded user info  to the request object for later use

        next();
        
    } catch (error) {
        console.log("Error in logMiddleware:", error);
        return res.status(500).json({message:"Internal server error"})
        
    }
}

export default logMiddqleware;
import exprees from 'express'
import { loginController, registerController, } from '../Controller/userController.js'
import logMiddqleware from '../MIddleware/logMiddleware.js'

const router = exprees.Router()

router.get("/profile", logMiddqleware, (req,res)=>{
    res.status(200).json({message:"This is user profile", user:req.user})
})

router.post("/register",registerController)

router.post("/login",loginController)

export default router
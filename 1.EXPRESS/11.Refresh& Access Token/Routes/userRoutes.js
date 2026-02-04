import exprees from 'express'
import { loginController, registerController } from '../Controller/userController.js'

const router = exprees.Router()

router.post("/register",registerController)
router.post("/login",loginController)

export default router
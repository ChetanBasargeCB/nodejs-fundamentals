//! Define Routes 
//! routs will works with controller 
// EX-->
// import{handelAllData,handelAddData} from 'contorllers'
// const router = express.Router()
//router.get("/",handelAllData)
//router.post("/",handelAddData)
import { handelAlldata } from '../Controlers/methods.js'
import express from 'express'

export const router = express.Router()

router.get("/",handelAlldata)

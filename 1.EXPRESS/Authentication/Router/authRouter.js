import express from 'express'
import { addData, getData, handelDelete } from '../Controller/controle.js'
export const authrouter = express.Router()

authrouter.get("/",getData)
// authrouter.get("/:name",databyName)

authrouter.post("/",addData)

authrouter.delete("/:id",handelDelete)


import express from 'express'
import { handelMenu } from '../Controller/controle.js'
export const menuRoute = express.Router()

menuRoute.get("/menu",handelMenu)

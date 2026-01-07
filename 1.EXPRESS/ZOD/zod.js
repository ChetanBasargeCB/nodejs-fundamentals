
import {z, ZodError }from 'zod'
import dotenv from 'dotenv'
dotenv.config()

// // Schema to validate port as a number
// const ageSchema = z.number().min(18).max(60)

// const age = 19

// const ParseAge = ageSchema.parse(age)
// const {data,error,success}= ageSchema.safeParse(age)

// console.log(success)

// Validation For PORT

const PortSchema = z.coerce.number().min(10).max(5000).default(3000)

const PORT = PortSchema.parse(process.env.PORT)


const {data, error, success} = PortSchema.safeParse(PORT)

console.log(data)
//! Write a code for routers (methods) by function
 //? Export the model  import user from '/model/user.js'
 //! Controllers Manupilates the Models (database Connection and Model )
// ex --> 
import user from "../Model/model.js"

export const handelAlldata = async (req,res)=>{
   const data = await user.find()
   return res.json(data)
}



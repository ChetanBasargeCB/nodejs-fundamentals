import Auth from "../Model/model.js"

export const addData = async(req,res)=>{
    const{id,name,username,password}=req.body
    const data = await Auth.create({id:id,name:name,username:username,password:password})
    return res.json(data)
}

export const getData = async(req,res)=>{
    const data =  await Auth.find()
    return res.json(data)
}

// export const databyName = async(req,res)=>{
//     const name = req.body.name
//     const data = await Auth.find({name:name})
//     return res.json(data)
// }

export const handelDelete = async(req,res)=>{
    const id = req.body.id
    console.log(id);
    const data = await Auth.deleteMany({id:id})
    res.json(data)
}

export const handelMenu = async(req,res)=>{
    res.send("welcome to Menu Authentication ")
}
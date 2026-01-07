import axios from "axios";
import React, { useEffect, useState } from "react";

export default function TodoCopy() {
     const[store,setStore]=useState([])

     const api = axios.create({
        baseURL:"http://localhost:3000",
       
     })
     const fetchData = async()=>{
        try {
            const connect = await api.get("/")
            setStore(connect.data)
        } catch (error) {
            
        }
     }
     useEffect(()=>{
        fetchData()
     },[])

     const task1 = {
        id:1,
        task:"this is hand made task"
     }

     const addTask = async()=>{
        try {
            const add = api.post("/",task1)
        } catch (error) {
            
        }

        fetchData()
     }

  return (
    <div>
      <div className="flex mt-20 gap-5  bg-gray-200 p-4 flex-wrap  ">
        {
            store.map((item)=>(
                <div key={item.id}>{item.task}</div>
            ))
        }
    
      </div>
      <button onClick={addTask}  >Add task</button>
    </div>
  );
}

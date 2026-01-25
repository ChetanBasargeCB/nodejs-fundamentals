import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function Home() {
    const [data,setData]=useState({question:""})
    const[output,setOutput]=useState([])
    const[lodaing,setLoading]=useState(false)
    
     const handelInput = (e)=>{
        setData({question:e.target.value})

    }
    const handelsubmit = async(e)=>{
         e.preventDefault()
        if(!data.question) return
        setLoading(true)
       try {
        const resp = await axios.post("http://localhost:4000/AI",{data}) 
        console.log( resp ,"server response")   
        const quiz = resp.data
        return setOutput(resp.data)

       } catch (error) {
        console.log("FE error",error)
       }
       setLoading(false)
    
    }
   console.log(output,"ok")

  return (
    <div className='bg-gray-300 min-h-screen flex flex-col items-center'>
        <div className='mt-10'>
            <form onSubmit={handelsubmit} className='flex shadow-2xl '> 
                <input type="text" className='bg-blue-100 outline-none p-2 rounded-xs' 
                 value={data.question} onChange={handelInput} placeholder='enter the topic name'  />
                <button type='submit' className='text-white bg-blue-600 p-2 rounded-xs px-4'>{lodaing?"..Sending":"Send"}</button>
            </form>
               {
                lodaing?<div className='flex justify-center items-center '> 
                    <p className=' rounded-full w-fit p-2 mt-10  text-blue-500 border-4 border-t-transparent animate-spin '></p>
                </div>:<div className='hidden'></div>
            }
            <div className='mt-10'>
              {
                output.map((item,i)=>(
                      <div key={i} className=' bg-white flex flex-col justify-center p-2  py-4 shadow-2xl rounded-xl '>
                    <h1>{item.question}</h1>
                    <ol className='flex flex-col items-center gap-2  '>
                        <li className='border-gray-300 border w-full text-center p-1 rounded-xs shadow-2xl hover:scale-105'>{item.options[0]}</li>
                        <li className='border-gray-300 border w-full text-center p-1 rounded-xs shadow-2xl hover:scale-105'>{item.options[1]}</li>
                        <li className='border-gray-300 border w-full text-center p-1 rounded-xs shadow-2xl hover:scale-105'>{item.options[2]}</li>
                        <li className='border-gray-300 border w-full text-center p-1 rounded-xs shadow-2xl hover:scale-105'>{item.options[3]}</li>
                        
                    </ol>
                </div>
                ))
              }
            </div>
        </div>
    </div>
  )
}

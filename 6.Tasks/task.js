
// const Event = require("events")
// const { emit } = require("process")

import Event from 'events'
// import { emit } from 'process'
const emitter = new Event()

const countevent = {
    "user-login":0,
    "user-purches":0,
    "user-logout":0,
    "profile-update":0
}

emitter.on("user-login", (name)=>{
    
    console.log(`Hello ${name} You are  loged in!`)
})

emitter.on("user-purches", (purches)=>{
    countevent["user-purches"]++
    console.log(`your are Purchesd ${purches}`)
})
emitter.on("profile-update", (profile)=>{
    countevent["profile-update"]++
    console.log(`${profile} has updated !`)
})
emitter.on("user-logout", (name)=>{
    countevent["user-logout"]++
    console.log(`${name} your are logout!`)
})
emitter.on("summry",()=>{
    console.log(countevent)
})
emitter.emit("user-login", "Chetan")
emitter.emit("user-purches", "laptop")
emitter.emit("profile-update", "Email")
emitter.emit("user-logout", "chetan")
emitter.emit("summry")

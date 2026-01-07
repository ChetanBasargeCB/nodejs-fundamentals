//----- Importing Event MOdule
// const EventEmitter = require("events")

import EventEmitter from "events";

//----- Creating Class
const emitter = new EventEmitter();

// // 1.Define/Creating Event
// emitter.on("greet",(name)=>{
//     console.log(`Hello Events Module from ${name}`)
// })

// //2.Trigger (emit) the event (same like Calling function)

// emitter.emit("greet","Chetan")


// ----- we can also pass multiple arguments

emitter.on("greet",(arg)=>{
    console.log(`Hello Events Module from ${arg.name} and your using NodeJS for ${arg.use} `)
})

//2.Trigger (emit) the event (same like Calling function)

emitter.emit("greet",{name:"chetan",use:"Back-end"})




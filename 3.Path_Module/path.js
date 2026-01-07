//  --- this is common js  method
// const path = require("path") 

// ---ECMA Script method 
import path from 'path'

// --filename
// console.log(__filename)
// console.log(__dirname)


// -------- Path_ Module Features 👇

//--- path.join()  --- it joins multiple paths (data) into one with correct back or forword slash /\
const filepath = path.join("Schoole", "student", "data.txt")

const pathOk = filepath

// path.parse()   --- it retruns object with details of given  path
const data = path.parse(pathOk)
console.log(data)

// path.resolve() --- it makes sequence path = (direct starts from give path) into abosulte path = (path is statrs from c:\Users..)
const abosulte = path.resolve(pathOk)


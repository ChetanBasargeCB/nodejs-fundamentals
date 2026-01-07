//----- First Technique (importing one by one){{
// const{add,sub}=require("./demo")
// console.log(add(5,2))
// console.log(sub(7,2))

//-----Second Technique (multiple)
// const { add, sub, mult,Pi} = require("./demo")

// console.log(add(5, 2))
// console.log(sub(7, 2))
// console.log(mult(23, 2))
// console.log(Pi)

//--- There is another one technique using  object value acccessing method (not use that much)
const math = require("./demo")
console.log(math.add(5, 2))
console.log(math.sub(7, 2))
console.log(math.mult(23, 2))
console.log(math.Pi)









// There are 2 Named Technique


const add  =(a,b)=>a+b;
const sub  =(a,b)=>a-b;
const mult =(a,b)=>a*b;
const Pi =5.5
//-----First Technique 👇 (Passing one by one)

// module.exports.add= add;
// module.exports.sub= sub;
// module.exports.mult= mult;

//---- Second Technique 👇
module.exports={add,sub,mult,Pi}

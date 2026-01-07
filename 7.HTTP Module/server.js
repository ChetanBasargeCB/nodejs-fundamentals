const http = require("http")

const server = http.createServer((req,res)=>{
    if(req.url==="/home"){
        res.write("Welcome to Home this is web-server homepage")
        res.end()
    }
       if(req.url==="/about"){
        res.write("Welcome to about page --watch   ")
        res.end()
    }
    if(req.url==="/contact"){
        res.write("Welcome to contact page \nThis My Number: 7499919135 Contact Now or \n Whats up now ")
        res.end()
    }
})


const port =3000;
server.listen(port,()=>console.log("Loding Port..."))
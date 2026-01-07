import readline from "readline"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const todos = [];

const showMenu = () => {
    console.log("\n1:Add Your Task")
    console.log("2:View Tasks")
    console.log("3:Exits")
    rl.question("Choose an Option",handelOption)
}

const handelOption = (option)=>{
    if(option==="1") {
        rl.question("Enter Task",(task)=>{ todos.push(task);
             console.log("Task Added :",task)
             showMenu()
        })
       
        
    } else  if(option==="2") {
        console.log("\nYour Todo Lists")
        todos.forEach((task,index)=>{
            console.log(`${index+1}. ${task}`)
        })
        showMenu()
    } else if (option==="3"){
        console.log("Goodebye!")
        rl.close();
    } else{
        console.log("Invailid Option Choose Correct Option")
        showMenu()
    }
}

showMenu()


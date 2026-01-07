
import readline from 'readline';
import fs from 'fs';

// Always wirte this line while using readline
const rl = readline.createInterface({
    input:process.stdin ,
    output:process.stdout
})

function FileCreate(){
    rl.question('Enter Your File Name', (filename)=>{
        rl.question('Enter the  content file', (content)=>{
            fs.writeFile(`${filename}.txt`,content,(err)=>{
                if(err){
                    console.log(`Error While  File Creation,${err}`)
                } else{
                    console.log(`"${filename}.txt"  Created Successfully`)
                }
                rl.close()
            })
        })
    })
}


FileCreate()
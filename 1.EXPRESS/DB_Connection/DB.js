import mysql from 'mysql2/promise'

//? Create Connection
const db = await mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Chetan@1234",
    database:"backend"

})

console.log('My Sql Connected Successful')

// ? Create DB 
// await db.execute(`CREATE DATABASE backend`)

//! show databases not  database
// console.log( await db.execute(`show databases`))

//?  Create Tabel

// await db.execute(`CREATE TABLE person(
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(20) NOT NULL,
//     email VARCHAR(30) UNIQUE NOT NULL
// )`)

// //? Show  Table 
// console.log(await db.execute(`select * from person`))

// //? INSERT INTO // inline insert
// await db.execute(`INSERT INTO person (name,email) values("Chetan","chetan@gamil.com")`)
// await db.execute(`INSERT INTO person (name,email) values("rohit","rohit@gamil.com")`)
// await db.execute(`INSERT INTO person (name,email) values("rohit","ganesh@gamil.com")`)



//? DELETE COLUMN (with multiple delete)
// await db.execute(`DELETE FROM person WHERE name  IN ( "Chetan","rohit","hardik","ganesh") `)

//? UPDATE Table 
await db.execute(`UPDATE person SET name = "ganesh" WHERE id = 27`);


//?  multiple insert // Preprade insert

const values = [
    ["Cb","cb@gmail.com"],
    ["ES","ss@gmail.com"],
    ["SS","ss@gmail.com"]
]

//! use db.query 

await db.query(`INSERT INTO pesron (name,email) values ?`,[values]);



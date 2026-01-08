//! Authentication learning file
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.URI

app.use(express.json())
//! Database Connection
mongoose.connect(URI)
    .then(() => console.log("DB Connected")).catch((err) => console.log("DB Connection Error", err))

//! Schema Declaration
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
    },
    password: String,
});
//! Model Creation (Collection)
const User = mongoose.model("User", userSchema)

//! CURD Opreation
const handelAddData = async (name, username, password) => {
    try {
        const data = await User.create({ name: name, username: username, password: password })
        console.log("data added in db")
        return data
    } catch (error) {
        console.log(error)
    }
}


app.get("/", (req, res) => {
    res.send("Welcome to Authentication Basic Concepts");
});

app.post("/", async (req, res) => {
    const { name, username, password } = req.body
    const data = await handelAddData(name, username, password)
    res.send("Data Added")
    // console.log(name,username,password)
})

app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT}`);
});

import express from 'express'
import dotenv from 'dotenv'


dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
app.post("/contact", (req, res) => {
    console.log(req.body)
    res.redirect("/")
})

// 404 Page
app.use((req, res) => {
    res.status(404).send("404 - Page Not Found")
})

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})


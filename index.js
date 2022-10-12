require('dotenv').config()
const express = require ('express')
const contactRoutes = require ('./routes/contact')

const app = express()

app.get('/', (req, res) =>{
    res.send("Hello World!")
})

app.listen (3200, () =>{
    console.log("Works!")
})

//routes
app.use(contactRoutes)
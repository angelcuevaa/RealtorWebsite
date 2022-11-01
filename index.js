require('dotenv').config()
const express = require ('express')
const contactRoutes = require ('./routes/contact')
bodyParser = require('body-parser');

const app = express()

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', (req,res) =>{
    res.send("Hello World!");
})
app.get('/contact', (req, res) =>{
    res.render('contact')
})

app.listen (3200, () =>{
    console.log("Works!")
})

//routes
app.use(contactRoutes)
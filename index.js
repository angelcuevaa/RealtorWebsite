require('dotenv').config()
const express = require ('express')
const contactRoutes = require ('./routes/ContactRoutes')
const RegisterRoutes = require('./routes/RegisterRoutes');
const ListingRoutes = require('./routes/ListingRoutes')
bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const app = express()

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(fileUpload());

app.get('/', (req,res) =>{
    res.send("Hello World!");
})
app.get('/contact', (req, res) =>{
    res.render('ContactView')
})

app.listen (3200, () =>{
    console.log("Works!")
})

//routes
app.use(contactRoutes);
app.use(RegisterRoutes);
app.use(ListingRoutes);
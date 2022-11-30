// require('dotenv').config()
const express = require ('express')
const session = require('express-session')
const cookieParser = require("cookie-parser");
const contactRoutes = require ('./routes/ContactRoutes')
const RegisterRoutes = require('./routes/RegisterRoutes');
const ListingRoutes = require('./routes/ListingRoutes')
bodyParser = require('body-parser');
const cors = require("cors");


const app = express()

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    key: "username",
    secret
    : "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 1000 * 60 * 60 * 24,
    },
}));

app.get('/', (req,res) =>{
    res.send("Hello World!");
})
app.get('/contact', (req, res) =>{
    res.render('ContactView')
})

app.listen (3200, () =>{
    console.log("Works!")
    console.log("Listening on port 3200")
})

//routes
app.use(contactRoutes);
app.use(RegisterRoutes);
app.use(ListingRoutes);
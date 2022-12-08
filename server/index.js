require('dotenv').config()
const express = require('express')
const session = require('express-session')
const cookieParser = require("cookie-parser");
const contactRoutes = require('./routes/ContactRoutes')
const RegisterRoutes = require('./routes/RegisterRoutes');
const ListingRoutes = require('./routes/ListingRoutes')
bodyParser = require('body-parser');
const cors = require("cors");
const fileUpload = require('express-fileupload');
const conn = require('./database');


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
// app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(fileUpload());
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

app.get('/', (req, res) => {
  res.send("Hello World!");
})
app.get('/contact', (req, res) => {
  res.render('ContactView')
})

app.listen(3200, () => {
  console.log("Listening on port 3200")
})

//routes
app.use(contactRoutes);
app.use(RegisterRoutes);
app.use(ListingRoutes);
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const connectDB = require("./db.js");

const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});
dotenv.config();
connectDB();

app.set('view engine', 'ejs');

app.use(express.json());

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: 'my secret', 
    resave: false, 
    saveUninitialized: false,
    store: store
  }))

app.use("/admin",adminRoutes);
app.use("/user",userRoutes);
app.use("/", (req, res) => {
  res.render('index');
});

app.listen(process.env.PORT,()=>{
  console.log(`server is listening at port ${process.env.PORT}`);
});

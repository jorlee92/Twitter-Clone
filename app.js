
let express = require('express');
let mongoose = require('mongoose');
let dotenv = require('dotenv').config();
let passport = require('passport');
var bodyParser = require('body-parser')

let app = express();
/* Passport Setup */
app.use(require('express-session')({ secret: 'random string', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

/* Misc */
app.use(bodyParser.urlencoded()) //Allows us to take data from forms.

/* MONGODB SETUP */
var uri ="mongodb://localhost:27017/twitter-clone";
mongoose.connect(uri)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
  console.log("Could not connect to MongoDB!", err.message);
});

/* Routing */ 

let auth = require('./routes/auth')
app.use('/auth', auth)
let index = require('./routes/index');
app.use('/', index);
let tweets = require('./routes/tweets');
app.use('/tweets', tweets)
let users = require('./routes/users');
app.use('/users', users)


app.listen(3001);

let passport = require('passport');
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let express = require('express');
var router = express.Router();
let User = require('../models/user')


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate( profile.id, profile.name.familyName, profile.name.givenName, 
     function (err, user) {
        return done(err, user);
    });
  }
));



passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

// GET /auth/google
router.get('/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router; 
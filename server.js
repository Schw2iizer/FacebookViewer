
var express = require("express");
var passport = require("passport");
var session = require("express-session");
var facebook = require("facebook");

var FacebookStrategy = require("passport-facebook").Strategy;
var port = 8080;

var app = express();


app.use(session({secret: "Something_Secret"}));


app.use(passport.initialize());
app.use(passport.session());



passport.use(new FacebookStrategy({
  clientID: '835036039868571',
  clientSecret: '12a46ca2c20ea99cfedfc675c10887bc',
  callbackURL: 'http://localhost:8080/auth/facebook/callback'
}, function(token, refreshToken, profile, done) {
  return done(null, profile);
}));

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get("/auth/facebook/callback", passport.authenticate("facebook", {
	successRedirect: "/me",
	failureRedirect: "/failure"
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get("/me", function(req, res){
	res.json(req.user);
	
})

app.listen(port);
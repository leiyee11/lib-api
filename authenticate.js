const passport = require('passport');
const userModel = require('./models/users');
const jwt = require('jsonwebtoken');
const facebookTokenStrategy = require('passport-facebook-token');
const config = require('./config');
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());
//Facebook strategy
passport.use(new facebookTokenStrategy({
clientID: config.facebook.clientId,
clientSecret: config.facebook.clientSecret
}, function (accessToken, refreshToken, profile, done) {
userModel.findOne({ facebookId: profile.id }, function (err, user) {
if (err) {
console.log(err);
return done(err, false);
}
else {
if (user) {
return done(null, user);
}
else{
let newUser = new userModel({
username: profile.displayName
})
newUser.facebookId = profile.id;
newUser.firstName = profile.name.givenName;
newUser.lastName = profile.name.familyName;
newUser.save(function (err, user) {
if (err) {
return done(err, false);
}
else {
return done(null, user);
}})}}})
}))
exports.getToken = function (user) {
//user is the _id of the document in the users collection
//user is the user info i.e payload which will be signed by secret //key. Token will expires in 360 sec
return jwt.sign(user, config.secretKey, {
expiresIn: '360s'
})
}
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./DB');
const userRoute = require('./routes/UserRoute');

var passport = require('passport');
var FacebookStrategy = require('passport-facebook');

const PORT = process.env.PORT || 3000;

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(config.DB).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use('/api/users', userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});



passport.use(new FacebookStrategy({
    clientID: process.env['597912377939921'],
    clientSecret: process.env['afffcdc940c8641dff25f7691273487a'],
    callbackURL: 'http://localhost:4200/oauth2/redirect/facebook'
  },
  function(accessToken, refreshToken, profile, cb) {
    db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
      'https://www.facebook.com',
      profile.id
    ], function(err, cred) {
      if (err) { return cb(err); }
      if (!cred) {
        db.run('INSERT INTO users (name) VALUES (?)', [
          profile.displayName
        ], function(err) {
          if (err) { return cb(err); }

          var id = this.lastID;
          db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
            id,
            'https://www.facebook.com',
            profile.id
          ], function(err) {
            if (err) { return cb(err); }
            var user = {
              id: id.toString(),
              name: profile.displayName
            };
            return cb(null, user);
          });
        });
      } else {
        db.get('SELECT * FROM users WHERE id = ?', [ cred.user_id ], function(err, user) {
          if (err) { return cb(err); }
          if (!user) { return cb(null, false); }
          return cb(null, user);
        });
      }
    }
  )}
));
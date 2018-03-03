/* eslint semi: 0 */

const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const env = require('dotenv');
const exphbs = require('express-handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Models
const models = require('./app/models');

// Sync Database
models.sequelize
  .sync()
  .then(function () {
    console.log('Your Database is connected and synced');
  })
  .catch(err => {
    console.log(err, 'Something went wrong with your DB Sync');
  });

// For Passport
app.use(
  session({ secret: 'keyboard cat', resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// For Handlebars
app.set('views', './app/views');
app.engine('hbs', exphbs({
  extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
  res.send('Welcome to Passport with Sequelize');
});
app.listen(3000, err => {
  if (!err) {
    console.log('Site is live at http://localhost:3000');
  } else {
    console.log(err);
  }
});

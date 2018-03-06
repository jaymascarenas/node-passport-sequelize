const path = require('path');
const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const env = require('dotenv').load();
const exphbs = require('express-handlebars');

// BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport
app.use(
  session({ secret: 'rHUyjs6RmVOD06OdOTsVAyUUCxVXaWci', resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Handlebars
const viewsPath = path.join(__dirname, 'views');
const layoutsPath = path.join(viewsPath, 'layouts');
const partialsPath = path.join(viewsPath, 'partials');
app.set('views', viewsPath);

const exphbsConfig = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: layoutsPath,
  partialsDir: [partialsPath],
  extname: '.hbs'
});

app.engine('hbs', exphbsConfig.engine);
app.set('view engine', '.hbs');

// Models
const models = require('./models');

// Express static assets
app.use(express.static("public"));

// Routes
const authRoute = require('./routes/auth.js')(app, passport);

// Load passport strategies
require('./config/passport/passport.js')(passport, models.user);

// Sync Database
models.sequelize
  .sync()
  .then(function() {
    console.log('Nice! Database looks fine');

    app.listen(3000, function(err) {
      if (!err) console.log('Site is live');
      else console.log(err);
    });
  })
  .catch(function(err) {
    console.log(err, 'Something went wrong with the Database Update!');
  });

## Node MySql Sequelize MVC with Passport, Express, and Handlebars

This repo contains everything you need to get started on your next full-stack node application.

Simply run:

```npm install```

Update your config.json file with your database credentials and create your database before running node.js

In your controllers folder each route that users can access while signed in, you just add an ```isLoggedIn``` middle-ware call to the route to allow the logged in user to reach that route/page.

i.e: 

```
app.get('/home', isLoggedIn, (req, res) => {
    res.render('home');
  });
```

Add some unit tests and you will be off to building a great app.

Enjoy! 

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//Initialize use of partials
hbs.registerPartials(__dirname + '/views/partials');
//Tells express what 'view engine' we want to use. In this case, Handlebars
app.set('view engine', 'hbs');
//Middleware that provides the user access to the file in the directory provided
//Teach express how to read from a static directory
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();

  var log = `${now}: ${req.method} ${req.url}`

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to serverl.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// })

//A way to use functions inside of hbs files
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hello, welcome!'
  })
});

app.get('/about',(req,res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad',(req, res) => {
  res.send({
    errorMessage: 'Unable to fulfil this request.'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
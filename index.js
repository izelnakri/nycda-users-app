const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      pug = require('pug'),
      fs = require('fs');

var app = express(),
    userStore = JSON.parse(fs.readFileSync('users.json'));

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'pug');

app.get('/', (request, response) => {
  response.render('index', { users: userStore });
});

app.get('/search', (request, response) => {
  response.render('search');
});

app.post('/search', (request, response) => {
  console.log(request.body);
  response.redirect('/search/' + request.body.query);
});

app.get('/search/*', (request, response) => {
  console.log(request.params[0]);
  response.send('search a user with the query: ' + request.params[0]);

  // make the actual search here!!:

  // if there is a found user we can render a template;
});

app.listen(3000, () => {
  console.log('Web Server is running on port 3000');
});

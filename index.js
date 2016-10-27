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
  response.redirect('/search/' + request.body.query);
});

app.get('/search/*', (request, response) => {
  var results = searchUsers(request.params[0]);

  response.render('search-result', { results: results });
});

app.listen(3000, () => {
  console.log('Web Server is running on port 3000');
});

function searchUsers(input) {
  var results = [];

  for (i = 0; i < userStore.length; i++) {
    if (searchFirstName(input, userStore[i]) || searchLastName(input, userStore[i])) {
      results.push(userStore[i]);
    }
  }

  return results;
}

function searchFirstName(input, user) {
  return user.firstname.toLowerCase().includes(input.toLowerCase());
}

function searchLastName(input, user) {
  return user.lastname.toLowerCase().includes(input.toLowerCase());
}

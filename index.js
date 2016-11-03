const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      pug = require('pug'),
      fs = require('fs');

const userRoutes = require('./routes/users'),
      searchRoutes = require('./routes/search');

var app = express(),
    userStore = require('./user-store');

app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', userRoutes);

app.use('/search', searchRoutes);

app.get('/', (request, response) => {
  response.render('users/index', { users: userStore.getUsers() });
});

app.get('/api/search/:query', (request, response) => {
  var results = userStore.searchUsers(request.params.query);
  response.json(results);
});

app.listen(3000, () => {
  console.log('Web Server is running on port 3000');
});

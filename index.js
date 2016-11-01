const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      fs = require('fs'),
      pug = require('pug');

var likeCount = JSON.parse(fs.readFileSync('likes.json')).likes;

const userRoutes = require('./routes/users'),
      searchRoutes = require('./routes/search');

var app = express(),
    userStore = require('./user-store');

app.set('view engine', 'pug');

app.use(morgan('dev'));

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', userRoutes);

app.use('/search', searchRoutes);

app.get('/', (request, response) => {
  response.render('users/index', { users: userStore.getUsers() });
});

app.post('/like', (request, response) => {
  likeCount = likeCount + 1;

  var likeCountJSONString = JSON.stringify({ likes: likeCount });

  response.json(likeCountJSONString);

  fs.writeFile('likes.json', likeCountJSONString , function() {
    console.log('new likes data written to likes.json');
  });
});

app.listen(3000, () => {
  console.log('Web Server is running on port 3000');
});

const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      pug = require('pug'),
      fs = require('fs');

const userRoutes = require('./routes/users'),
      searchRoutes = require('./routes/search');

var app = express(),
    userStore = require('./user-store');

var likeStore = JSON.parse(fs.readFileSync('likes.json'));

app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', userRoutes);

app.use('/search', searchRoutes);

app.get('/', (request, response) => {
  response.render('users/index', { users: userStore.getUsers() });
});

app.post('/like', (request, response) => {
  likeStore.likeCount = likeStore.likeCount + 1;

  response.json(likeStore);

  fs.writeFile('likes.json', JSON.stringify(likeStore), (error, data) => {
    if (error) {
      throw error;
    }

    console.log('new likeCount added to likes.json');
  });
});



app.listen(3000, () => {
  console.log('Web Server is running on port 3000');
});

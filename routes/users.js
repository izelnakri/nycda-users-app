const express = require('express'),
      fs = require('fs'),
      router = express.Router();

var userStore = JSON.parse(fs.readFileSync('users.json'));

router.post('/', (request, response) => {
  userStore.push(request.body);

  response.redirect('/');

  fs.writeFile('../users.json', JSON.stringify(userStore), (error, data) => {
    if (error) {
      throw error;
    }
  });
});

router.get('/new', (request, response) => {
  response.render('users/new');
});

module.exports = router;

const express = require('express'),
      fs = require('fs'),
      router = express.Router();

var userStore = require('./../user-store');

router.post('/', (request, response) => {
  userStore.addUser(request.body);

  response.redirect('/');
});

router.get('/new', (request, response) => {
  response.render('users/new');
});

module.exports = router;

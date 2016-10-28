const express = require('express'),
      fs = require('fs'),
      router = express.Router();

var userStore = JSON.parse(fs.readFileSync('users.json'));

router.get('/', (request, response) => {
  response.render('search/new');
});

router.post('/', (request, reponse) => {
  reponse.redirect('/search/' + request.body.query);
});

router.get('/:query', (request, response) => {
  var results = searchUsers(request.params.query);

  response.render('search/show', { results: results });
});

function searchUsers(input) {
  var results = [];

  for (var i = 0; i < userStore.length; i++) {
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

module.exports = router;

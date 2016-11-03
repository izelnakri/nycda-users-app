$(".in-application-search input").on('keyup', function(event) {
  var $input = $(event.currentTarget);
  var query = $input.val();

  if (query !== "") {
    $.get('/api/search/' + query, function(body) {
      $('.in-application-search-results').html('');

      body.forEach(function(element) {
        $('.in-application-search-results').append(
          '<li>' + element.firstname + ' ' +
          element.lastname + '</li>'
        );
      });
    });
  }
});

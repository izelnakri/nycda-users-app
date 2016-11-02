$(".like-button").on('click', function() {
  $.post('/like', function(data) {
    console.log('POST request is finished');
    $(".like-button").text('LIKE COUNT: ' + JSON.parse(data).likes);
  });
});

$(".in-application-search input").on('keyup', function() {
  var query = $(this).val();
  $.get('/api/search/' + query, function(data) {
    $(".search-results").html('');
    data.forEach(function(element) {
      $(".search-results").append(
        $('<li>' + element.firstname + ' ' + element.lastname + '</li>')
      );
    });
  });
});

$(".in-like-button").on('click', function() {
  $.post('/like', function(data) {
    $('.in-like-button').text('LIKES: ' + data.likeCount);
  });
});

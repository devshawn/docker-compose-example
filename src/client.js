var red, blue;

$(document).ready(function () {
  $.get('/votes', function(data, status){
    red = data['red'];
    blue = data['blue'];
      $('.blue').html(data['blue']);
      $('.red').html(data['red']);
  });

  $('.red-button').click(function() {
    red++;
    $('.red').html(red);
    $.post('/vote', {color: 'red'}, function(data, status) {});
  });

  $('.blue-button').click(function() {
    blue++;
    $('.blue').html(blue);
    $.post('/vote', {color: 'blue'}, function(data, status) {});
  });

});

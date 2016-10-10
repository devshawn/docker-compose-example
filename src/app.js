var express = require('express');
var bodyParser = require('body-parser');
var redis = require("redis");
var app = express();
var client = redis.createClient();

client.on('error', function(err) {
  console.log('Redis error: ' + err);
});

client.mget(['red', 'blue'], function(err, reply) {
  if(reply[0] == null) { client.set('red', 0); }
  if(reply[1] == null) { client.set('blue', 0); }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.htm');
});

app.get('/votes', function(req, res) {
  client.mget(['red', 'blue'], function(err, reply) {
    res.json({
      'red' : reply[0],
      'blue' : reply[1]
    });
  });
});

app.post('/vote', function (req, res) {
  var color = req.body.color;
  if(color == 'red' || color == 'blue') {
    client.incr(color);
    res.json({'success': true, 'color' : color});
  } else {
    res.status(400);
    res.json({
      'error' : 'You must vote for red or blue.'
    });
  }
});

app.listen(3000, function () {
  console.log('Voting application listening on port 3000!');
});

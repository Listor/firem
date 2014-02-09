var express = require('express');
  app = express(),
  _ = require('lodash');

var calls = [
  {
    "dept" : "HFD",
    "datetime" : new Date("2013-01-27T03:38:12Z"),
    "_id" : "HFD_01-26-2013_2138-12",
    "location": {
      "latitude": 90,
      "longitude": 90
    }
  },
  {
    "dept" : "HFD",
    "datetime" : new Date("2013-01-26T19:38:38Z"),
    "_id" : "HFD_01-26-2013_1338-38"
  },
  {
    "dept" : "HFD",
    "datetime" : new Date("2014-01-01T17:14:19Z"),
    "_id" : "HFD_01-01-2014_1114-19"
  },
  {
    "dept" : "WFD",
    "datetime" : new Date("2014-17-01T17:14:19Z"),
    "_id" : "WFD-01-2014_1114-19"
  }
];

var calls_by_id = _.indexBy(calls, '_id');

app.use(express.static(process.cwd() + '/app'));
app.use('/assets', express.static(process.cwd() + '/app/public'));

app.get('/api', function(req, res){
  res.send('{version: 0.1}');
});

app.get('/api/calls', function(req, res){
  res.send(calls);
});

app.get('/api/calls/:id', function(req, res){
  res.send(calls_by_id[req.params.id]);
});

app.get('/', function(req, res) {
   res.sendfile('./index.html');
});

app.listen(3000, function() { console.log('Server listening on port 3000'); });
var express = require('express');
var app = express();
 
app.use(express.static(process.cwd() + '/app'));
app.use('/assets', express.static(process.cwd() + '/app/public'));

app.get('/api', function(req, res){
  res.send('{version: 0.1}');
});

app.get('/api/calls', function(req, res){
  var rtnObj = [
    {
      "dept" : "HFD",
      "datetime" : new Date("2013-01-27T03:38:12Z"),
      "id" : "HFD_01-26-2013_2138-12",
      "location": {
        "latitude": 90,
        "longitude": 90
      }
    },
    {
      "dept" : "HFD",
      "datetime" : new Date("2013-01-26T19:38:38Z"),
      "id" : "HFD_01-26-2013_1338-38"
    },
    {
      "dept" : "HFD",
      "datetime" : new Date("2014-01-01T17:14:19Z"),
      "id" : "HFD_01-01-2014_1114-19"
    },
    {
      "dept" : "WFD",
      "datetime" : new Date("2014-17-01T17:14:19Z"),
      "id" : "WFD-01-2014_1114-19"
    }
  ];
  res.send(rtnObj);
});

app.get('/', function(req, res) {
   res.sendfile('./index.html');
});

app.listen(3000, function() { console.log('Server listening on port 3000'); });
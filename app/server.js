var express = require('express');
var app = express();
 
app.use(express.static(process.cwd() + '/app'));
app.use('/assets', express.static(process.cwd() + '/app/public'));

app.get('/api', function(req, res){
  res.send('{version: 0.1}');
});

app.get('/', function(req, res) {
   res.sendfile('./index.html');
});

app.listen(3000, function() { console.log('Server listening on port 3000'); });
var express = require('express');
var app = express();
 
app.use(express.static(process.cwd() + '/public'));
app.use('/app', express.static(__dirname + '/app'));

app.get('/', function(req, res) {
   res.sendfile('./index.html');
});

app.listen(3000);
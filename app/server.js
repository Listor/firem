var express = require('express');
  app = express(),
  _ = require('lodash'),
  mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fire');


var Schema = mongoose.Schema;  

var Call = new Schema({
    _id       : { type: String, required: true },
    dept      : { type: String, required: true },  
    datetime  : { type: Date, required: true },  
    location  : { type: [ Number ], index: '2d' },
    address   : {
      street  : { type: String },
      city    : { type: String },
      state   : { type: String },
      zip     : { type: String }
    },
    comments  : { type: String },
    tags      : { type: [ String ] }
});

var CallModel = mongoose.model('Call', Call);  

app.use(express.static(process.cwd() + '/app'));
app.use('/assets', express.static(process.cwd() + '/app/public'));

app.get('/api', function(req, res){
  res.send('{version: 0.1}');
});

app.get('/api/calls', function(req, res){
  return CallModel.find(function (err, calls) {
    if (!err) {
      return res.send(calls);
    } else {
      return console.log(err);
    }
  });
});

app.get('/api/calls/:id', function(req, res){
  return CallModel.findById(req.params.id, function (err, call) {
    if (!err) {
      return res.send(call);
    } else {
      return console.log(err);
    }
  });
});

app.put('/api/calls/:id', function(req, res){
  return CallModel.findById(req.params.id, function(err, call) {
    call.comments = req.body.comments;
    return call.save(function (err) {
      if (!err) {
        console.log("updated");
      } else {
        console.log(err);
      }
      return res.send(call);
    });
  });
});

app.get('/', function(req, res) {
   res.sendfile('./index.html');
});

app.listen(3000, function() { console.log('Server listening on port 3000'); });
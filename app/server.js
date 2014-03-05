var express = require('express');
  app = express(),
  _ = require('lodash'),
  mongoose = require('mongoose'),
  extend = require('util')._extend;
mongoose.connect('mongodb://localhost/fire');


var Schema = mongoose.Schema;  

var Call = new Schema({
    _id       : { type: String, required: true },
    dept      : { type: String, required: true },  
    datetime  : { type: Date, required: true },  
    loc       : { type: { type: String}, coordinates:[]},
    address   : {
      street  : { type: String },
      city    : { type: String },
      state   : { type: String },
      zip     : { type: String }
    },
    comments  : { type: String },
    tags      : { type: [ String ] }
});
Call.index({ location: '2dsphere' });
var CallModel = mongoose.model('Call', Call);  

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(process.cwd() + '/app'));
app.use('/assets', express.static(process.cwd() + '/app/public'));
app.use('/files', express.static('/Users/ryanhirsch/src/web/ember-firelog/calls'));

app.get('/api', function(req, res){
  res.send('{version: 0.1}');
});

var callTransform = function(call) {
  var plainCall = call.toObject();
  var location = call.loc.coordinates;
  var mappedLocation = {
    "longitude" : location[0],
    "latitude"  : location[1]
  };

  plainCall.loc = mappedLocation;
  return plainCall;
};

app.get('/api/calls', function(req, res){
  return CallModel.find().sort({'datetime': -1}).find(function (err, calls) {
    if (!err) {
      return res.send(calls.map(callTransform));
    } else {
      return console.log(err);
    }
  });
});

app.get('/api/calls/:id', function(req, res){
  return CallModel.findById(req.params.id, function (err, call) {
    if (!err) {
      return res.send(callTransform(call));
    } else {
      return console.log(err);
    }
  });
});

app.put('/api/calls/:id', function(req, res) {
  console.log('in put');
  console.log(req.body);
  return CallModel.findById(req.params.id, function(err, call) {
    call.comments = req.body.comments;
    call.address  = req.body.address;
    call.loc      = {
      "type"        : "Point",
      "coordinates" : [req.body.loc.longitude, req.body.loc.latitude]
    };
    console.log(req.body.loc);
    console.log(call);
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
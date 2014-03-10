var   _ = require('lodash'),
    mongoose = require('mongoose'),
    Q = require('q'),
    util = require('util'),
    fs = require('fs');

mongoose.connect('mongodb://localhost/fire');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

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
var callRegexp = new RegExp(/(\w+)_((\d{2})-(\d{2})-(\d{4}))_(\d{4})-(\d{2}).mp3/);

var getInfo = function(filePath) {
    var newItem = {};
    var matches = filePath.match(callRegexp);
    if(matches) {
    //    return getCallDuration(filePath).then(function(callDuration) {
            var timeComponent = util.format('%s:%s:%s',
                matches[6].substr(0,2),
                matches[6].substr(2),
                matches[7]);
            var dateComponent = matches[2];
            var dateTimeString = util.format('%s %s', dateComponent, timeComponent);

            newItem.dept = matches[1];
            newItem.datetime = new Date(dateTimeString);
            newItem._id = matches[0].substr(0, matches[0].length - 4);
            return newItem;
     //   });
    }
};

var getFiles = function(path) {
    if(typeof path === 'undefined') path = '/Users/ryanhirsch/src/web/ember-firelog/calls';
    var deferred = Q.defer();

    fs.readdir(path, function(err, files) {
        if(err) deferred.reject(err);
        var promisesArray = _.chain(files).map(getInfo).compact().value();
        deferred.resolve(Q.all(promisesArray));
    });

    return deferred.promise;
};

db.once('open', function callback () {
    console.log('connected');
    getFiles().then(function(calls) {
        calls.forEach(function(c) {
            // var thisNewCall = new CallModel(c);
            // console.log(c);
            CallModel.create(c, function(err, doc) {
                if(err) {
                    console.error(err);
                }
            });
        });
        //mongoose.disconnect();
    });
});
var latLong = {
  serialize: function(loc) {
    return [loc.latitude, loc.longitude];
  },
  deserialize: function(arr) {
    //var array = string.split(":");
    return {
      "latitude": arr[0],
      "longitude": arr[1]
    };
  }
};

App.FireCall = Ember.Model.extend({
  'dept'    : Ember.attr('string'),
  'datetime': Ember.attr('date'),
  'location': Ember.attr(latLong) 
});

App.FireCall.url = "/api/calls";
// App.FireCall.primaryKey = '_id';
App.FireCall.adapter = Ember.RESTAdapter.create();

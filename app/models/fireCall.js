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
  'dept'    : Ember.attr(),
  'datetime': Ember.attr(Date),
  'location': Ember.attr(latLong) 
});

App.FireCall.adapter = Ember.RESTAdapter.create();
App.FireCall.url = "/api/calls";
App.FireCall.primaryKey = '_id';

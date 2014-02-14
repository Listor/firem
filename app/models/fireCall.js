var GeoPoint = {
  serialize: function(loc) {
    return {
      coordinates: [loc.longitude, loc.latitude],
      type: 'Point'
    };
  },
  deserialize: function(obj) {
    console.log(obj);
    if(obj) {
      return {
        "longitude": obj.coordinates[0],
        "latitude": obj.coordinates[1]
      };
    }
    else {
      return {
        "longitude": undefined,
        "latitude": undefined
      };
    }
  }
};

App.FireCall = Ember.Model.extend({
  'dept'    : Ember.attr(),
  'datetime': Ember.attr(Date),
  'loc': Ember.attr(GeoPoint),
  'comments': Ember.attr()
});

App.FireCall.adapter = Ember.RESTAdapter.create();
App.FireCall.url = "/api/calls";
App.FireCall.primaryKey = '_id';

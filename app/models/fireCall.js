App.FireCall = Ember.Model.extend({
  'dept'    : Ember.attr('string'),
  'datetime': Ember.attr('date')//,
  // 'location': {
  //   'latitude'  : DS.attr('number'),
  //   'longitude' : DS.attr('number')
  // }
});

App.FireCall.url = "/api/calls";
App.FireCall.adapter = Ember.RESTAdapter.create();

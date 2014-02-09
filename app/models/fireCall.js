App.FireCall = Ember.Model.extend({
  'dept'    : Ember.attr('string'),
  'datetime': Ember.attr('date')
});

App.FireCall.url = "/api/calls";
App.FireCall.primaryKey = '_id';
App.FireCall.adapter = Ember.RESTAdapter.create();

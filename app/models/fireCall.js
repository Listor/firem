App.FireCall = Ember.Model.extend({
  'dept'    : Ember.attr(),
  'datetime': Ember.attr(Date),
  'location': Ember.belongsTo('App.Location', { key: 'loc', embedded: true }),
  'comments': Ember.attr(),
  'tags'    : Ember.attr(Array),
  'address' : Ember.belongsTo('App.Address', { key: 'address', embedded: true })
});

App.FireCall.adapter = Ember.RESTAdapter.create();
App.FireCall.url = "/api/calls";
App.FireCall.primaryKey = '_id';
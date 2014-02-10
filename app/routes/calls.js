App.CallsRoute = Ember.Route.extend({
  model: function() {
    return App.FireCall.fetch();
  }
});

App.CallsIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('calls');
  }
});
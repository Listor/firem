App.CallsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('fireCall');
  }
});
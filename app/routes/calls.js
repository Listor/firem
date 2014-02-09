App.CallsRoute = Ember.Route.extend({
  model: function() {
    return App.FireCall.find();
  }
});
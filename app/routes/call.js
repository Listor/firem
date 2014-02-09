App.CallRoute = Ember.Route.extend({
  model: function(fireCall) {
    console.log(fireCall);
    return App.FireCall.find(fireCall.call_id);
  }
});
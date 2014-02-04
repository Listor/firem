App.CallRoute = Ember.Route.extend({
  model: function(fireCall) {
    console.log(fireCall);
    return this.store.find('fireCall', fireCall.call_id);
  }
});
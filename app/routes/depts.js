App.DeptsRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('calls').filterBy('dept', params.depts_content);
  }
});
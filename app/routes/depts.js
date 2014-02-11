App.DeptsRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('department', this.get('department'));
  },
  model: function(params) {
    this.set('department', params.depts_content);
    return App.FireCall.fetch().then(function(resolvedCalls) {
      return resolvedCalls.get('content').filterBy('dept', params.depts_content);
    });
  }
});
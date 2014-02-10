 App.DeptsRoute = Ember.Route.extend({
  model: function(params) {
    return App.FireCall.fetch().then(function(resolvedCalls) {
      return resolvedCalls.get('content').filterBy('dept', params.depts_content);
    });
  }
});
App.DeptsController = Ember.ArrayController.extend({
  needs: ['calls'],
  sortProperties: ['datetime'],
  sortAscending: false
});
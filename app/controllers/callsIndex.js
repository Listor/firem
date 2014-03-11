App.CallsIndexController = Ember.ArrayController.extend({
  sortProperties: ['datetime'],
  sortAscending: false,
  latest: function() {
    return this.get('arrangedContent').slice(0,10);
  }.property('arrangedContent.@each')
});
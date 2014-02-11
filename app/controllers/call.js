App.CallController = Ember.ObjectController.extend({
  isEditing : false,
  actions: {
    startEditing: function() {
      this.set('isEditing', true);
    },
    doneEditing: function() {
      this.set('isEditing', false);
    },
    saveCall: function() {
      var call = this.get('model');
      call.save();
      this.set('isEditing', false);
      this.transitionToRoute('depts', call.get('dept'));
    }
  }
});
App.CallController = Ember.ObjectController.extend({
  isEditing : false,
  filepath: function() {
    return '/files/' + this.get('_id') + '.mp3';ß
  }.property('_id'),
  actions: {
    startEditing: function() {
      this.set('isEditing', true);
    },
    stopEditing: function() {
      this.set('isEditing', false);
    },
    saveCall: function() {
      var call = this.get('model');
      debugger;
      if(call.get('address.isDirty') || call.get('location.isDirty')) {
        call.set('isDirty', true);
      }
      call.save();
      this.set('isEditing', false);
      this.transitionToRoute('call', call._id);
    }
  }
});
App.CallController = Ember.ObjectController.extend({
  valid_states: ['IL', 'MO'],
  isEditing : false,
  filepath: function() {
    return '/files/' + this.get('_id') + '.mp3';
  }.property('_id'),
  inline_address: function() {
    return this.get('address.street') + ', ' + this.get('address.city') +
      ', ' + this.get('address.state') + ' ' + this.get('address.zip');
  }.property('address.street', 'address.city', 'address.state', 'address.zip'),
  latlng: function() {
    return this.get('location.latitude') + ', ' + this.get('location.longitude');
  }.property('location.latitude', 'location.longitude'),
  actions: {
    startEditing: function() {
      this.set('isEditing', true);
    },
    stopEditing: function() {
      this.set('isEditing', false);
    },
    saveCall: function() {
      var call = this.get('model');

      if(call.get('address.isDirty') || call.get('location.isDirty')) {
        call.set('isDirty', true);
      }
      call.save();
      this.set('isEditing', false);
      this.transitionToRoute('call', call._id);
    }
  }
});
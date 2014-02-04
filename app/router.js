App.Router.map(function() {
  this.resource('calls', { path: '/' }, function() {
    this.resource('call', { path: 'calls/:fireCall_id' }, function() {

    });
    this.resource('depts', { path: 'calls/dept/:depts_content' }, function() {
    });
  });
});
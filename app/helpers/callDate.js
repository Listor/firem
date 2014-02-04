Ember.Handlebars.helper('callDate', function(date) {
    return moment(date).fromNow();
});

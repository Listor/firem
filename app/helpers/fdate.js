Ember.Handlebars.helper('fdate', function(date, format) {
    return moment(date).format(format);
});
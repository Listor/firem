App.MultipleSelectComponent = Ember.Component.extend({
    didInsertElement: function() {
        this.$().select2({tags: ['beep', 'hecker', 'test', 'foo', 'bar']});
    },
    simpleTags: function() {
        console.log(this.get('tags').toString());
        return this.get('tags').toString();
    }.property('tags')
});
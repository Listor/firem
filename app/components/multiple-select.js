App.MultipleSelectComponent = Ember.Component.extend({
  tagName: 'input',
  attributeBindings: ['type', 'value'],
  type: 'hidden',
  value: function() {
    return this.get('currentlyTagged');
  }.property('currentlyTagged'),
  didInsertElement: function() {
    var selectChange = function(e) { 
      this.set('currentlyTagged', e.val);
    };
    var ajaxConfig = {
      url: this.get('src')
    };
    var getDistinctTags = new Ember.RSVP.Promise(function(resolve, reject){
      $.ajax($.extend({}, ajaxConfig, {
        success: function(json) {
          resolve(json);
        },
        error: function(jqXhr, textStatus, errorThrown){
          reject({ jqXhr: jqXhr, textStatus: textStatus, errorThrown: errorThrown});
        }
      }));
    });

    var setupSelect = function(allTags) {
      this.$().select2({
        tags: allTags,
        width:'100%'
      })
      .on("change", selectChange.bind(this));
    };
    ;
    
    getDistinctTags.then(setupSelect.bind(this));
  }
});
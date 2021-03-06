var groupBy = function (groupBy) {
	var get = Ember.get;
	var dependentKey = 'content.@each.' + groupBy;

	return Ember.computed(dependentKey, function() {
		var result = [];

		this.get('content').forEach(function(item){
			var hasGroup = !!result.findBy('group', get(item, groupBy));

			if (!hasGroup) {
				result.pushObject(Ember.Object.create({
					group: get(item, groupBy),
					content: []
				}));
			}

			result.findBy('group', get(item, groupBy)).get('content').pushObject(item);
		});

		return result;
	});
};

App.CallsController = Ember.ArrayController.extend({
	grouped: groupBy('dept')
});
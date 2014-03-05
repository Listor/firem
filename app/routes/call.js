App.CallRoute = Ember.Route.extend({
  model: function(fireCall) {
    return App.FireCall.find(fireCall.fireCall_id);
  },
  actions: {
    geocode: function () {
      var controller = this.controller;

      var ajaxConfig = {
        url: 'https://maps.googleapis.com/maps/api/geocode/json',
        data: {
          sensor: false,
          address: controller.get('inline_address'),
          key: 'AIzaSyDCMm0HHUSiwjtpqqrBkRCfDPQ1Thuu_Mw'
        }
      };

      var promise = new Ember.RSVP.Promise(function(resolve, reject){
        $.ajax($.extend({}, ajaxConfig, {
          success: function(json) {
            resolve(json);
          },
          error: function(jqXhr, textStatus, errorThrown){
            reject({ jqXhr: jqXhr, textStatus: textStatus, errorThrown: errorThrown});
          }
        }));
      });
      
      promise.then(function(data) {
        var location = data.results[0].geometry.location;
        console.log(location);
        controller.set('location.latitude', location.lat);
        controller.set('location.longitude', location.lng);
      }, function() {
        console.error("oh noes!");
      });
    }
  }
});

App.CallEditRoute = Ember.Route.extend({
  model: function(fireCall) {
    console.log(fireCall);
    return App.FireCall.find(fireCall.call_id);
  }
});
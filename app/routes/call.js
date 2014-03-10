App.CallRoute = Ember.Route.extend({
    model: function(fireCall) {
        var call = App.FireCall.find(fireCall.fireCall_id);
        if(!call.get('address')) {
            call.set('address', App.Address.create());
        }
        return call;
    },
    actions: {
        reverse_geocode: function() {
            var controller = this.controller;

            var ajaxConfig = {
                url: 'https://maps.googleapis.com/maps/api/geocode/json',
                data: {
                    sensor: false,
                    latlng: controller.get('latlng'),
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
                
                var address = data.results[0].formatted_address;
                var matches = address.match('^(.*?), (.*?), (.{2}) (.*?),');
                controller.set('address.street', matches[1]);
                controller.set('address.city', matches[2]);
                controller.set('address.state', matches[3]);
                controller.set('address.zip', matches[4]);
            }, function() {
                console.error("oh noes!");
            });
        },
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
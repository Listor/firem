App.GoogleMapComponent = Ember.Component.extend({
    didInsertElement: function() {
        this.$().css('height', '400px');
        var centerLatLng, mapOptions, calls = [];
        if(this.get('loc').forEach) {
            var latAvg = 0, longAvg = 0, total = 0;
            this.get('loc').forEach(function(call) {
                if(call.get('location.latitude')) {
                    latAvg = latAvg + call.get('location.latitude');
                    longAvg = longAvg + call.get('location.longitude');
                    calls.push({
                        latitude    : call.get('location.latitude'),
                        longitude   : call.get('location.longitude')
                    });
                }
            });

            centerLatLng = new google.maps.LatLng(latAvg/calls.length, longAvg/calls.length);
            mapOptions = {
                zoom: 10,
                center: centerLatLng
            };
        }
        else {
            centerLatLng = new google.maps.LatLng(this.get('loc.latitude'),this.get('loc.longitude'));
            mapOptions = {
                zoom: 15,
                center: centerLatLng
            };
            calls.push({
                latitude    : this.get('loc.latitude'),
                longitude   : this.get('loc.longitude')
            });
        }
        var map = new google.maps.Map(this.$()[0], mapOptions);
        calls.forEach(function(call) {
            new google.maps.Marker({
                position    : new google.maps.LatLng(call.latitude, call.longitude),
                map         : map
            });
        })
    }
});
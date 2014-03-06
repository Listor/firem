App.GoogleMapComponent = Ember.Component.extend({
    didInsertElement: function() {
        var myLatlng = new google.maps.LatLng(this.get('lat'),this.get('long'));
        var mapOptions = {
            zoom: 15,
            center: myLatlng
        };
        this.$().css('height', '300px');
        var map = new google.maps.Map(this.$()[0], mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: this.get('title')
        });
    }
});
App.FireCallSerializer = DS.RESTSerializer.extend({
  extractSingle: function(store, type, payload, id, requestType) {
    var location = payload.fireCall.location;
    payload.location = location;

    return this._super.apply(this, arguments);
  }
});
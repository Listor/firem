App.FireCall = DS.Model.extend({
  'dept'    : DS.attr('string'),
  'datetime': DS.attr('date'),
  'lat'     : DS.attr('number'),
  'long'    : DS.attr('number')
});

App.FireCall.FIXTURES = [
  {
    "dept" : "HFD",
    "datetime" : new Date("2013-01-27T03:38:12Z"),
    "id" : "HFD_01-26-2013_2138-12"
  },
  {
    "dept" : "HFD",
    "datetime" : new Date("2013-01-26T19:38:38Z"),
    "id" : "HFD_01-26-2013_1338-38"
  },
  {
    "dept" : "HFD",
    "datetime" : new Date("2014-01-01T17:14:19Z"),
    "id" : "HFD_01-01-2014_1114-19"
  }
];
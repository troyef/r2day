var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var Ractive = require('ractive');
var fs = require('fs');
var template = fs.readFileSync(__dirname + '/main.html', 'utf8');

var WeatherService = require('../services/WeatherService');
var LocationService = require('../services/LocationService');
var WhatToWearService = require('../services/WhatToWearService');

var MainModel = Backbone.Model.extend({});

module.exports = Backbone.View.extend({
  initialize: function(){
    console.log('initialize');
    this.weatherService = WeatherService;
    this.locationService = LocationService;
    this.whatToWearService = WhatToWearService;
    

    this.model = new MainModel({
      theWeather : '',
      myLoc : '',
      temp : 0,
      wind : 0,
      realTemp : 0,
    
      hat : '',
      glove : '',
      pant : '',
      shirt : '',
      jacket : ''
    });
    
    //this.listenTo(this.model, 'change', this._updateRactive);
    
    this.getLocation();
    
    this.render();
  },
  
  events: {
      'click button.refresh': '_refreshButtonClick'
  },
  
  render: function () {
    var me = this;
    if (this.ractive) {
        this.ractive.teardown();
    }
    this._renderRactive();
  },
  
  _renderRactive: function () {
    this.ractive = new Ractive({
      el: $('body'),
      template: template,
      data: this.model.toJSON(),
      
      refresh: this._updateRactive.bind(this),
      getWeather: this.getWeather.bind(this)
    });
    this.delegateEvents();
  },

  _updateRactive: function () {
      if (this.ractive) {
          this.ractive.set(this.model.toJSON());
      }
  },
  
  getLocation: function getLocation(){
    this.locationService.getLocation(function(pos){
      if (pos !== null){
        var coords = pos.coords,
          lat = coords.latitude,
          lon = coords.longitude;
          this.weatherService.getGPSWeather(lat, lon, this.handleWeatherCallback.bind(this)); 
      }
      
    }.bind(this))
  },
  
  getWeather: function getWeather(zip){
    this.weatherService.getZipWeather(zip, this.handleWeatherCallback.bind(this));
  },
  
  handleWeatherCallback: function handleWeatherCallback(wObj){
    this.displayWeatherInfo(wObj);
    this.displayClothingSuggestions(wObj);
    this._updateRactive();
  },
  
  refresh: function refresh(){
    debugger;
    this._updateRactive();
  },
  
  displayClothingSuggestions: function displayClothingSuggestions(wObj){
    var wtw = this.whatToWearService.getWhatToWear(this.model.get('realTemp'), wObj.weather[0].id);
    console.dir(wtw);
    this.model.set('hat', wtw.hat);
    this.model.set('glove', wtw.glove);
    this.model.set('pant', wtw.pant);
    this.model.set('shirt', wtw.shirt);
    this.model.set('jacket', wtw.jacket);
  },

  displayWeatherInfo: function displayWeatherInfo(wObj){
    console.dir(wObj);
    this.model.set('myLoc',wObj.name || '');
    this.model.set('theWeather', wObj.weather[0].main);
    this.model.set('temp', wObj.main.temp);
    this.model.set('wind', wObj.wind.speed);
  
    this.model.set('realTemp', this.getRealTemp());
  },
  
  getRealTemp: function getRealTemp (){
    var isRaining = (this.model.get('theWeather').toLowerCase().indexOf('rain') !== -1);
    //take into account cloudy versus clear, etc.
    
    return Math.round(this.model.get('temp') - (this.model.get('wind') / 5) - (isRaining ? 10 : 0));
  }
  
  
});
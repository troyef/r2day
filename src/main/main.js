var React = require('react');

var WeatherService = require('../services/WeatherService');
var LocationService = require('../services/LocationService');
var WhatToWearService = require('../services/WhatToWearService');
var WeatherModel = require('../models/WeatherModel');

var Main = React.createClass({
  
  weatherService : WeatherService,
  locationService : LocationService,
  whatToWearService : WhatToWearService,
  
  getInitialState: function() {
    this.getLocation();
    
    return {weather: {},
            wtw: {}
          };
  },
  
  render: function() {
    return (
<div>
  <input type="text" placeholder="zip" ref="zip"/>

  <button onClick={this.getWeather} >get the weather</button>


  <div >You are at {this.state.weather.myLoc}.</div>

  <div >Weather: {this.state.weather.theWeather}</div>

  <div >Temp: {this.state.weather.temp}</div>

  <div >Wind: {this.state.weather.wind}</div>

  <div >Humidity: {this.state.weather.humidity}</div>

  <div >So running in the sun would feel like: {this.state.weather.realTemp}</div>

  <br/><br/><br/>
  <div >
    You should wear:<br/><br/>

    Hat: {this.state.wtw.hat}<br/>
    Gloves: {this.state.wtw.glove}<br/>
    Jacket: {this.state.wtw.jacket}<br/>
    Pants: {this.state.wtw.pant}<br/>
    Shirt: {this.state.wtw.shirt}<br/>
  </div>
</div>
    );
  },
  
  getWeather: function getWeather(){
    var zip = React.findDOMNode(this.refs.zip).value.trim();
    this.weatherService.getZipWeather(zip, this.handleWeatherCallback);
  },
  
  handleWeatherCallback: function handleWeatherCallback(wObj){
    var weather = new WeatherModel(wObj);
    var wtw = this.displayClothingSuggestions(weather);
    this.setState({weather: weather,
                    wtw: wtw});
    
  },
  
  displayClothingSuggestions: function displayClothingSuggestions(weather){
    var wtw = this.whatToWearService.getWhatToWear(weather.realTemp, weather.weatherId);
    console.dir(wtw);
    return wtw;
    
  },
  
  getLocation: function getLocation(){
    this.locationService.getLocation(function(pos){
      if (pos !== null){
        var coords = pos.coords,
          lat = coords.latitude,
          lon = coords.longitude;
          this.weatherService.getGPSWeather(lat, lon, this.handleWeatherCallback); 
      }
      
    }.bind(this))
  }
  
});

module.exports = Main;



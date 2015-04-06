import {XHR} from 'angular2/core';

export class WeatherService {
  
  constructor(){

  }
  
  getZipWeather(zip, fn){
    var url = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zip + '&units=imperial';
    
    this.doRequest(url, fn);
    
  }
  
  getGPSWeather(lat, lon, fn){
    var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial';
    
    this.doRequest(url, fn);
    
  }
  
  doRequest(url, fn){
    $.ajax({
      dataType: "jsonp",
      url: url,
      success: fn
    });
  }
  
}


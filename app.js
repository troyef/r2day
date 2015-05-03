import {Component,ChangeDetector, Template, bootstrap} from 'angular2/angular2';
import {bind} from 'angular2/di';
import {WeatherService} from 'services/WeatherService';
import {LocationService} from 'services/LocationService';
import {WhatToWearService} from 'services/WhatToWearService';

// Annotation section
@Component({
  selector: 'my-app',
  /*componentServices: [
    WeatherService
  ]*/
})
@Template({
  url: 'templates/runToday.html'
})

// Component controller
class MyAppComponent {
  weatherService: WeatherService;
  locationService: LocationService;
  whatToWearService: WhatToWearService;
  theWeather : any;
  myLoc: any;
  temp: any;
  wind: any;
  realTemp: any;
  
  hat: any;
  glove: any;
  pant: any;
  shirt: any;
  jacker: any;
  
  
  constructor() {
    this.weatherService = new WeatherService();
    this.locationService = new LocationService();
    this.whatToWearService = new WhatToWearService();

    this.theWeather = '';
    this.myLoc = '';
    this.temp = 0;
    this.wind = 0;
    this.realTemp = 0;
    
    this.hat = '';
    this.glove = '';
    this.pant = '';
    this.shirt = '';
    this.jacket = '';

    this.getLocation();
    
  }
  
  getLocation(){
    this.locationService.getLocation(function(pos){
      if (pos !== null){
        let coords = pos.coords,
          lat = coords.latitude,
          lon = coords.longitude;
          this.weatherService.getGPSWeather(lat, lon, this.displayWeatherInfo.bind(this)); 
      }
      
    }.bind(this))
  }
  
  getWeather(zip){
    this.weatherService.getZipWeather(zip, this.handleWeatherCallback.bind(this));
  }
  
  handleWeatherCallback(wObj){
    this.displayWeatherInfo(wObj);
    this.displayClothingSuggestions(wObj);
  }
  
  refresh(){
    this.myLoc = this.myLoc;
  }
  
  displayClothingSuggestions(wObj){
    var wtw = this.whatToWearService.getWhatToWear(this.realTemp, wObj.weather[0].id);
    console.dir(wtw);
    this.hat = wtw.hat;
    this.glove = wtw.glove;
    this.pant = wtw.pant;
    this.shirt = wtw.shirt;
    this.jacket = wtw.jacket;
  }
  
  displayWeatherInfo(wObj){
    console.dir(wObj);
    this.myLoc = wObj.name || '';
    this.theWeather = wObj.weather[0].main;
    this.temp = wObj.main.temp;
    this.wind = wObj.wind.speed;
    
    this.realTemp = this.getRealTemp();
  }
  
  getRealTemp (){
    var isRaining = (this.theWeather.toLowerCase().indexOf('rain') !== -1);
    //take into account cloudy versus clear, etc.
    
    return Math.round(this.temp - (this.wind / 5) - (isRaining ? 10 : 0));
  }
}

//export function main() {
  bootstrap(MyAppComponent);
  //}

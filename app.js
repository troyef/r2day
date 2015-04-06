import {Component,ChangeDetector, Template, bootstrap} from 'angular2/angular2';
import {bind} from 'angular2/di';
import {WeatherService} from 'services/WeatherService';
import {LocationService} from 'services/LocationService';

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
  theWeather : any;
  myLoc: any;
  temp: any;
  wind: any;
  realTemp: any;
  
  constructor() {
    this.weatherService = new WeatherService();
    this.locationService = new LocationService();

    this.theWeather = '';
    this.myLoc = '';
    this.temp = 0;
    this.wind = 0;
    this.realTemp = 0;

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
    this.weatherService.getZipWeather(zip, this.displayWeatherInfo.bind(this));
  }
  
  refresh(){
    this.myLoc = this.myLoc;
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

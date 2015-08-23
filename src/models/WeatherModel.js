
var WeatherModel = function WeatherModel(wObj){
  
  console.dir(wObj);
  this.myLoc = wObj.name || '';
  this.theWeather = wObj.weather[0].main || '';
  this.weatherId = wObj.weather[0].id || '';
  this.temp = wObj.main.temp || '';
  this.wind = wObj.wind.speed || '';
  this.humidity = wObj.main.humidity || '';
  
  this.dtTime = wObj.dt || '';
  this.sunrise = wObj.sys.sunrise || null;
  this.sunset = wObj.sys.sunset || null;
  
  this.setPrecip();
  
  this.realTemp = this.getRealTemp();
};
  
WeatherModel.prototype.setPrecip = function setPrecip(){
  var wVal = this.weatherId;
  if (wVal >= 200 && wVal < 600){
    this.precip = 'rain';
  } else if (wVal >= 600 && wVal < 700){
    this.precip = 'snow';
  } else {
    this.precip = '';
  }
     
};
  
WeatherModel.prototype.getRealTemp = function getRealTemp (){
  var temp = this.temp,
  humidity = this.humidity,
  wVal = this.weatherId,
  dtTime = this.dtTime,
  quarterDay = 0;
  
  //heat index or humidity variant
  if (temp >= 80){
    temp = this.heatIndex(temp, humidity)
  } else if (temp >= 70){
    temp = this.heatIndex2(temp, humidity)
  }
  
  temp = Math.round(temp);
  
  
  //take into account rain currently falling
  if (wVal === 701 || (wVal>= 500 && wVal < 600)){
    temp -= 10;
  }
  
  //take into account cloudy versus clear, etc.
  if (wVal >= 800 && wVal < 803){
    if(this.sunrise !== null && this.sunset !== null
      && dtTime > this.sunrise && dtTime < this.sunset){
        
        //find the middle half of the day by figuring the outer quarters
        quarterDay = Math.round((this.sunset - this.sunrise) / 4);
        //if daytime and middle of day (direct sun)
        if (dtTime > (this.sunrise + quarterDay) && dtTime < (this.sunset - quarterDay)){
          temp += 5;
        } else {
          //now look for an eighth of a day
          quarterDay = Math.round(quarterDay/2);
          if (dtTime > (this.sunrise + quarterDay) && dtTime < (this.sunset - quarterDay)){
            temp += 2;
          } else {
            temp += 1;
          }
        }
      } 
  }
  
  temp -= Math.floor(this.wind / 5);
  
  return temp;
};
  
  //taken from wikipedia: https://en.wikipedia.org/wiki/Heat_index
  // temps above 80, precise to 1.5d F
WeatherModel.prototype.heatIndex = function heatIndex(temp, humidity){
  var val = -42.379; //c1
  val += (2.04901523 * temp); //c2
  val += (10.14333127 * humidity); //c3
  val += (-0.22475541 * temp * humidity); //c4
  val += (-.00683783 * Math.pow(temp, 2)); //c5
  val += (-.05481717 * Math.pow(humidity, 2)); //c6
  val += (.00122874 * Math.pow(temp, 2) * humidity); //c7
  val += (.00085282 * Math.pow(humidity, 2) * temp); //c8
  val += (-.00000199 * Math.pow(humidity, 2) * Math.pow(temp, 2)); //c9
  
  return Math.round(val);
};
  
  //taken from wikipedia: https://en.wikipedia.org/wiki/Heat_index
  //for temps between 70 and 80, precise to 3d F
WeatherModel.prototype.heatIndex2 = function heatIndex2(temp, humidity){
  var val = 16.923; //c1
  val += (.185212 * temp); //c2
  val += (5.37941 * humidity); //c3
  val += (-.100254 * temp * humidity); //c4
  val += (.00941695 * Math.pow(temp, 2)); //c5
  val += (.00728898 * Math.pow(humidity, 2)); //c6
  val += (.000345372 * Math.pow(temp, 2) * humidity); //c7
  val += (-.000814971 * Math.pow(humidity, 2) * temp); //c8
  val += (.0000102102 * Math.pow(humidity, 2) * Math.pow(temp, 2)); //c9

  val += (-.000038646 * Math.pow(temp, 3)); //c10
  val += (.0000291583 * Math.pow(humidity, 3)); //c11
  val += (.00000142721 * Math.pow(temp, 3) * humidity); //c12
  val += (.000000197483 * Math.pow(humidity, 3) * temp); //c13
  val += (-.0000000218429 * Math.pow(humidity, 2) * Math.pow(temp, 3)); //c14
  val += (.000000000843296 * Math.pow(humidity, 3) * Math.pow(temp, 2)); //c15
  val += (-.0000000000481975 * Math.pow(humidity, 3) * Math.pow(temp, 3)); //c16

  return Math.round(val);
}; 


module.exports = WeatherModel;
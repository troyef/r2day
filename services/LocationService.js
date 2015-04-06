export class LocationService {

  constructor(){
  }
  
  getLocation(fn){
    if (typeof navigator.geolocation !== undefined){
      navigator.geolocation.getCurrentPosition(fn);
    } else {
      fn.call(null);
    }
    
  }
  
}
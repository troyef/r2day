module.exports = {
  
  getLocation: function getLocation(fn){
    if (typeof navigator.geolocation !== undefined){
      navigator.geolocation.getCurrentPosition(fn);
    } else {
      fn.call(null);
    }
    
  }
};

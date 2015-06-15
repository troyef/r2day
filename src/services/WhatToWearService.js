var clothesDefs = {};

clothesDefs.glove = require('./ruleDefs/GloveRules');
clothesDefs.hat = require('./ruleDefs/HatRules');
clothesDefs.jacket = require('./ruleDefs/JacketRules');
clothesDefs.pant = require('./ruleDefs/PantRules');
clothesDefs.shirt = require('./ruleDefs/ShirtRules');

module.exports = {
  clothesDefs : clothesDefs,
  
  
  getWhatToWear: function getWhatToWear(temp, wCode){
    var suggestion = {},
    def;
    
    for(def in this.clothesDefs){
      if (this.clothesDefs.hasOwnProperty(def)){
        suggestion[def] = this.clothesDefs[def].evaluateRules.call(this.clothesDefs[def], temp, wCode);
      }
    }
    
    return suggestion;
  }
  
};
var base = require('./BaseRules');

module.exports = {
  
  evaluateRules: base.evaluateRules,
  
  options : [
    {
      value: 'none',
      rules: function(){return false;}
    },
    {
      value: 'light_gloves',
      rules: function(temp, wCode){
        return ( temp < 45 && temp > 20);
      }
    },
    {
      value: 'midweight_gloves',
      rules: function(temp, wCode){
        return ( temp < 20 );
      }
    }
  ],
  defaultIdx :0
    
};

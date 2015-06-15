var base = require('./BaseRules');

module.exports = {
  
  evaluateRules: base.evaluateRules,
  
  options : [
    {
      value: 'optional',
      rules: function(){return false;}
    },
    {
      value: 'ss_shirt',
      rules: function(temp){
        return (temp > 50);
      }
    },
    {
      value: 'ls_shirt',
      rules: function(temp){
        return ((temp > 40 && temp < 50) || (temp > 20 && temp < 30));
      }
    },
    {
      value: 'heavy_shirt',
      rules: function(temp){
        return ((temp > 30 && temp < 40) || temp < 20);
      }
    }
  ],
  defaultIdx :0
    
};
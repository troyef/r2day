var base = require('./BaseRules');

module.exports = {
  
  evaluateRules: base.evaluateRules,
  
  options : [
    {
      value: 'optional',
      rules: function(){return false;}
    },
    {
      value: 'shorts',
      rules: function(temp){
        return (temp > 40);
      }
    },
    {
      value: 'knickers',
      rules: function(temp){
        return (temp > 30 && temp < 40);
      }
    },
    {
      value: 'pants',
      rules: function(temp){
        return (temp > 15 && temp < 30);
      }
    },
    {
      value: 'heavy_pants',
      rules: function(temp){
        return (temp < 15);
      }
    }
  ],
  defaultIdx :0
    
};
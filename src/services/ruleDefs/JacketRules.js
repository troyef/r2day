var base = require('./BaseRules');

module.exports = {
  
  evaluateRules: base.evaluateRules,
  
  options : [
    {
      value: 'none',
      rules: function(){return false;}
    },
    {
      value: 'jacket',
      rules: function(temp, wCode){
        return ((temp < 30 ) ||
          (temp < 60 && wCode < 700));
      }
    }
  ],
  defaultIdx :0
    
};
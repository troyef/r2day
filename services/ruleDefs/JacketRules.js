import {BaseRules} from 'services/ruleDefs/BaseRules';

export class JacketRules extends BaseRules {
  
  constructor(){
    super();
    
    this.options = [
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
    ];
    this.defaultIdx = 0;
  }
  
}
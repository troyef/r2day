import {BaseRules} from 'services/ruleDefs/BaseRules';

export class ShirtRules extends BaseRules {
  
  constructor(){
    super();
    
    this.options = [
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
    ];
    this.defaultIdx = 0;
  }
  
}
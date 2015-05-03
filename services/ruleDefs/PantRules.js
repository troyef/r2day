import {BaseRules} from 'services/ruleDefs/BaseRules';

export class PantRules extends BaseRules {
  
  constructor(){
    super();
    
    this.options = [
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
      
    ];
    this.defaultIdx = 0;
  }
  
}
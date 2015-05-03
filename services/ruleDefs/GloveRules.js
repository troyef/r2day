import {BaseRules} from 'services/ruleDefs/BaseRules';

export class GloveRules extends BaseRules {
  
  constructor(){
    super();
    
    this.options = [
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
    ];
    this.defaultIdx = 0;
  }
}
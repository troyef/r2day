import {BaseRules} from 'services/ruleDefs/BaseRules';

export class HatRules extends BaseRules {
  
  constructor(){
    super();
    
    this.options = [
      {
        value: 'optional',
        rules: function(){return false;}
      },
      {
        value: 'running_cap',
        rules: function(temp, wCode){
          return ((temp > 30 && temp < 55) ||
              (temp > 85 && wCode === 800) ||
              (wCode < 700));
        }
      },
      {
        value: 'cap_ears',
        rules: function(temp){
          return (temp > 10 && temp < 30);
        }
      },
      {
        value: 'sock_cap',
        rules: function(temp){
          return (temp < 15);
        }
      }
    ];
    this.defaultIdx = 0;
  }
  
}
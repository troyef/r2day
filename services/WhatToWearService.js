import {GloveRules} from 'services/ruleDefs/GloveRules';
import {HatRules} from 'services/ruleDefs/HatRules';
import {JacketRules} from 'services/ruleDefs/JacketRules';
import {PantRules} from 'services/ruleDefs/PantRules';
import {ShirtRules} from 'services/ruleDefs/ShirtRules';

export class WhatToWearService {
  
  constructor(){
    var clothesDefs = {};
    
    clothesDefs.glove = new GloveRules();
    clothesDefs.hat = new HatRules();
    clothesDefs.jacket = new JacketRules();
    clothesDefs.pant = new PantRules();
    clothesDefs.shirt = new ShirtRules();
    
    this.clothesDefs = clothesDefs;
  }
  
  getWhatToWear(temp, wCode){
    var suggestion = {},
    def;
    
    for(def in this.clothesDefs){
      if (this.clothesDefs.hasOwnProperty(def)){
        suggestion[def] = this.clothesDefs[def].evaluateRules.call(this.clothesDefs[def], temp, wCode);
      }
    }
    
    return suggestion;
  }
  
}
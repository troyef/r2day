module.exports = {
  
  evaluateRules: function evaluateRules(temp,wCode){
    var option,i = 0;
    for (;i < this.options.length; i++){
      option = this.options[i];
      if (option.rules(temp, wCode) === true){
        return option.value;
      }
    }
    //if not found, return the default value
    return this.options[this.defaultIdx].value;
  }
  
};
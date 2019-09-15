angular.module('application').filter('questionTrigger', function() {
  return function(input) {
    let to_return = true;
    if(input.answer === "true" || (!input.answer && input.value !== input.answer)){
      input.answer = null;
      to_return = false;
    }
    if(input.condition !== null && input.value !== null && input.answer !== null
      && input.condition !== undefined && input.value !== undefined && input.answer !== undefined){
      switch(input.condition){
        case '==':
          to_return = input.value === input.answer;
          break;
        case '<':
          to_return = input.value < input.answer;
          break;
        case '>':
          to_return = input.value > input.answer;
          break;
        case '>=':
          to_return = input.value >= input.answer;
          break;
        case '<=':
          to_return = input.value <= input.answer;
          break;
        case '!=':
          to_return = input.value >= input.answer;
          break;
        default:
          to_return = false;
          break;
      }
    }
    return to_return;
  };
});

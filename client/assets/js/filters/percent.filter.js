angular.module('application').filter('percent', function() {
  return function(input) {
    let to_return = '-';
    if(input){
      to_return = input + '%';
    }
    return to_return;
  };
});

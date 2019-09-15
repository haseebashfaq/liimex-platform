angular.module('application').filter('maximisation', function() {
  return function(input) {
    let to_return = '-';
    if(input){
      to_return = input + 'x';
    }
    return to_return;
  };
});

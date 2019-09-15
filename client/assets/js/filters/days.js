angular.module('application').filter('days', function($rootScope) {
  return function(input) {
    let to_return = '-';
    let _lang = $rootScope.langPreference==='en'?' days':' tage';
    if(input){
      to_return = input + _lang;
    }
    return to_return;
  };
});

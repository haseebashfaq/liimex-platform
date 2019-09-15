angular.module('application').filter('euro', ['$rootScope', function($rootScope) {
  return function(input = 0, is_unlimited) {
  	let _return_unlimited = $rootScope.langPreference === 'en' ? 'Unlimited' : 'Unbegrenzt';
  	if(is_unlimited === true){
  		return _return_unlimited;
  	}
    input = Number(input).toFixed(2);
    let split_input = input.toString().split('.');
    let whole = split_input[0];
    let decimal = split_input[1] || '00';
    whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    let to_return = whole+','+decimal;
    if(input==0){
    	return '-';
    }
    return '€' + to_return;
  };
}]);

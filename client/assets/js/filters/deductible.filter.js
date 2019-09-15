angular.module('application').filter('deductible', [ '$filter', function($filter) {
  return function(input = {}) {
    let to_return;
    if(input.deductible_percent_max || input.deductible_absolute_max){
        if(input.deductible_is_percent && input.deductible_max_is_percent){
            to_return = $filter('percent')(input.deductible_percent)+' (Max: '+$filter('percent')(input.deductible_percent_max)+')';
        } else if(input.deductible_is_percent && !input.deductible_max_is_percent){
            to_return = $filter('percent')(input.deductible_percent)+' (Max: '+$filter('euro')(input.deductible_absolute_max)+')';
        } else if(!input.deductible_is_percent && input.deductible_max_is_percent){
            to_return = $filter('euro')(input.deductible_absolute)+' (Max: '+$filter('percent')(input.deductible_percent_max)+')';
        } else {
            to_return = $filter('euro')(input.deductible_absolute)+' (Max: '+$filter('euro')(input.deductible_absolute_max)+')';
        }
    } else {
        if(input.deductible_percent && input.deductible_is_percent){
            to_return = $filter('percent')(input.deductible_percent);
        } else if(input.deductible_absolute && !input.deductible_is_percent){
            to_return = $filter('euro')(input.deductible_absolute);
        }
    }
    to_return = to_return || '-';
    //to_return = to_return == 'undefined' || '-';
    return to_return;
  };
}]);

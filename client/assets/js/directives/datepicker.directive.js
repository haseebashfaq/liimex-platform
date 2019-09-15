/*
* This Directive is converts text fields into date pickers
*/
angular.module('application').directive("datepicker", function($rootScope) {
  return {
    scope: {
            ngModel : '='
    },
    link: function(scope, elem, attr) {
      let _toObj = eval(scope.ngModel);
      const model_date = new Date(_toObj);
      const model_day = model_date.getDate();
      const model_month = model_date.getMonth()+1;
      const index_year = attr.maxYear-model_date.getFullYear()+1;
      const model_year = model_date.getFullYear();

      const INDEX_0 = 0,
      INDEX_1 = 1,
      INDEX_2 = 2;
      const params = attr.minYear && attr.maxYear ? {
        minYear: attr.minYear,
        maxYear: attr.maxYear,
        format: 'x'
      } : {};
      const picker = elem.combodate(params)
      const blank_year = $rootScope.langPreference === 'en' ? 'YYYY' : 'JJJJ';
      if(model_year && model_month && model_day){
        picker.context.nextElementSibling.children[INDEX_0][INDEX_0].outerHTML = '<option value="" label="DD"  disabled></option>';
        picker.context.nextElementSibling.children[INDEX_1][INDEX_0].outerHTML = '<option value="" label="MM"  disabled></option>';
        picker.context.nextElementSibling.children[INDEX_2][INDEX_0].outerHTML = '<option value="" label="'+blank_year+'" disabled></option>';
        const index_map = [{start:INDEX_0, check:model_day}, {start:INDEX_1, check:model_month}, {start:INDEX_2, check:index_year}]
        for(let key in index_map){
          index_map[key].start
          index_map[key].check
          for(let index = INDEX_0; index<picker.context.nextElementSibling.children[index_map[key].start].length; index++){
            if(index === index_map[key].check){
              const end_option = picker.context.nextElementSibling.children[index_map[key].start][index].outerHTML.slice(7)
              const start_option = picker.context.nextElementSibling.children[index_map[key].start][index].outerHTML.slice(0,7)
              picker.context.nextElementSibling.children[index_map[key].start][index].outerHTML = start_option.concat(' selected', end_option);
            }
          }
        }
      } else {
        picker.context.nextElementSibling.children[INDEX_0][INDEX_0].outerHTML = '<option value="" label="DD" selected disabled></option>';
        picker.context.nextElementSibling.children[INDEX_1][INDEX_0].outerHTML = '<option value="" label="MM" selected disabled></option>';
        picker.context.nextElementSibling.children[INDEX_2][INDEX_0].outerHTML = '<option value="" label="'+blank_year+'" selected disabled></option>';
      }
      return picker;
    }
  }
});

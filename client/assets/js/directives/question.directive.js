/*
* This Directive returns the correct HTML for different Question UI Types
*/
angular.module('application').directive("question", [
  '$compile',
  '$http',
  '$templateCache',
  '$templateRequest',
  '$sce',
  'uuid2',function($compile, $http, $templateCache, $templateRequest, $sce, uuid2) {

  /* Get HTML Template */
  function getTemplate(contentType, language) {
    const baseUrl = '/partials/'+language+'/minis/questiontypes/',
    templateMap = {
      number: 'number.html',
      date: 'date.html',
      text: 'text.html',
      form: 'form.html',
      radio: 'radio.html',
      select: 'select.html',
      upload: 'upload.html'
    }
    const templateUrl = baseUrl + (templateMap[contentType] || 'notype.html');
    const templateLoader = $sce.getTrustedResourceUrl(templateUrl);
    return templateLoader;
  }

  // /* Validate */
  // function validate(ui_type, form, model, field_id){
  //   switch(ui_type){
  //     case 'form':
  //     console.log('form', model);
  //     form.$setValidity(field_id, (model !== undefined && model !== null))
  //     break;
  //     default:
  //     break;
  //   }
  // }

  /* Linker */
  function linker(scope, element, attrs, formCtrl) {
    scope.form = formCtrl;
    const templateLoader = getTemplate(scope.data.ui_type, scope.lang || 'en')
    $templateRequest(templateLoader).then(html => {
      var view = $compile(html)(scope);
      element.append(view);
    }, error => {
      console.error(error);
    });
  }

  return {
    restrict: 'E',
    require: ['^form'],
    replace: false,
    scope: {
      data:'=',
      key:'=',
      ngModel: '='
    },
    link: linker
  };
}]);

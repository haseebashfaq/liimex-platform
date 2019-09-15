angular.module("application").directive("footerCustom", ['$rootScope',function($rootScope) {
	var _templateUrl = 'partials/en/footer.html';
	if($rootScope.langPreference =='de') _templateUrl = 'partials/de/footer.html';	
  return {
    restrict: 'EA',
    template : '<div ng-include="getTemplateUrl()"></div>',
    scope: true,
    transclude : false,
    controller: 'FooterController'
  };
}]);
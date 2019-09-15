// Angular Module
angular.module('application').controller('RetryController', RetryController);

// Injections
RetryController.$inject = ['$rootScope','$scope', '$stateParams', '$state', '$controller', 'redirectService', 'backofficeService', 'apiService'];

// Function
function RetryController($rootScope, $scope, $stateParams, $state, $controller, redirectService, backofficeService, apiService) {

  /* Back */
  $scope.goBack = function(){
    // window.history.back();
    if(!$scope.retryObj.instant_product_request && $scope.retryObj.current_page>=0){
    	redirectService.changeStateWithLang('instant', {
        product_id: null,
        new: null,
        page: $scope.retryObj.current_page,
        process_id: $stateParams.process_id
      });
    }
  }

}

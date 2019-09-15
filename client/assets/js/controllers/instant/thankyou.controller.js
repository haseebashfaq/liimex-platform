// Angular Module
angular.module('application').controller('ThankyouController', ThankyouController);

// Injections
ThankyouController.$inject = ['$rootScope','$scope', '$stateParams', '$state', '$controller', 'redirectService', 'backofficeService', 'apiService', 'instantService'];

// Function
function ThankyouController($rootScope, $scope, $stateParams, $state, $controller, redirectService, backofficeService, apiService, instantService) {

	/* Scope Varialbes */

	/* Get All the Data of instant product request */
  function GetAllData(){
      let page_count;
      for(var page in $scope.page_data.pages){
      	page_count = page;
      }
      if(page_count==$scope.page_data.current_page){
      	ProcessCompleted();
      }
      $scope.safeApply(fn => fn);
  }

  /* Status for process complete */
	function ProcessCompleted(){
		instantService.processComplete($stateParams.process_id, process_completed=>{
      console.log(process_completed);
    }, error => {
      $scope.safeApply(fn => fn)
    });
	}

  /* On Controller Load */
  GetAllData();
}
